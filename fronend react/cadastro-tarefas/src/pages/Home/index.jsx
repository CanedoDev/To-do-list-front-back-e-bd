import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {

  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputName = useRef()
  const inputTask = useRef()
  const inputDeadline = useRef()

  async function getTasks() {
    setIsLoading(true)
    try {
      const tasksApi = await api.get('/tarefas')
      setTasks(tasksApi.data)
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function createTask() {
    if (!inputName.current.value || !inputTask.current.value || !inputDeadline.current.value) {
      return
    }

    setIsSubmitting(true)
    try {
      await api.post('/tarefas', {
        name: inputName.current.value,
        task: inputTask.current.value,
        deadline: inputDeadline.current.value
      })

      inputName.current.value = ''
      inputTask.current.value = ''
      inputDeadline.current.value = ''

      await getTasks()
    } catch (error) {
      console.error('Erro ao cadastrar tarefa:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/tarefas/${id}`)
      await getTasks()
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] mx-auto gap-6 px-4 py-12">
      <form className="w-full bg-white backdrop-blur-md border border-[rgba(157,157,245,0.3)] rounded-2xl p-8 shadow-sm">
        <h1 className="text-[1.6rem] font-bold text-center text-[#2e2a77] mb-7 tracking-tight">Lista de Tarefas</h1>

        <div className="flex flex-col gap-1.5 mb-[1.15rem]">
          <label htmlFor="nome" className="text-[0.85rem] font-semibold text-[#4f4c8c]">Responsável</label>
          <input
            ref={inputName}
            id="nome"
            type="text"
            name="nome"
            placeholder="Nome de quem vai fazer"
            required
            className="w-full py-3 px-[1.15rem] bg-white/50 border border-[rgba(157,157,245,0.4)] rounded-xl text-[#1e1b4b] text-[0.95rem] placeholder-[#9390c4] transition-all duration-200 ease-in-out focus:outline-none focus:bg-white/95 focus:border-[rgb(157,157,245)] focus:ring-[3px] focus:ring-[rgba(157,157,245,0.25)]"
          />
        </div>

        <div className="flex flex-col gap-1.5 mb-[1.15rem]">
          <label htmlFor="tarefa" className="text-[0.85rem] font-semibold text-[#4f4c8c]">Tarefa</label>
          <input
            ref={inputTask}
            id="tarefa"
            type="text"
            name="tarefa"
            placeholder="O que precisa ser feito?"
            required
            className="w-full py-3 px-[1.15rem] bg-white/50 border border-[rgba(157,157,245,0.4)] rounded-xl text-[#1e1b4b] text-[0.95rem] placeholder-[#9390c4] transition-all duration-200 ease-in-out focus:outline-none focus:bg-white/95 focus:border-[rgb(157,157,245)] focus:ring-[3px] focus:ring-[rgba(157,157,245,0.25)]"
          />
        </div>

        <div className="flex flex-col gap-1.5 mb-[1.15rem]">
          <label htmlFor="prazo" className="text-[0.85rem] font-semibold text-[#4f4c8c]">Prazo</label>
          <input
            ref={inputDeadline}
            id="prazo"
            type="text"
            name="prazo"
            placeholder="Prazo (ex: 15/07 ou urgente)"
            required
            className="w-full py-3 px-[1.15rem] bg-white/50 border border-[rgba(157,157,245,0.4)] rounded-xl text-[#1e1b4b] text-[0.95rem] placeholder-[#9390c4] transition-all duration-200 ease-in-out focus:outline-none focus:bg-white/95 focus:border-[rgb(157,157,245)] focus:ring-[3px] focus:ring-[rgba(157,157,245,0.25)]"
          />
        </div>

        <button
          onClick={createTask}
          type="button"
          disabled={isSubmitting}
          className="w-full mt-4 py-3 px-6 bg-[rgb(120,120,245)] border border-[rgb(100,100,230)] rounded-xl text-white font-semibold text-[0.95rem] flex justify-center items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out shadow-[0_2px_4px_rgba(120,120,245,0.2)] hover:bg-[rgb(100,100,230)] hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adicionando...
            </>
          ) : (
            'Adicionar Tarefa'
          )}
        </button>
      </form>

      <div className="w-full flex flex-col gap-[0.85rem]">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full bg-white/60 backdrop-blur-md border border-[rgba(157,157,245,0.2)] rounded-xl p-5 shadow-[0_2px_5px_rgba(0,0,0,0.01)] animate-pulse flex flex-col gap-2.5">
              <div className="h-4 bg-[rgba(157,157,245,0.15)] rounded w-3/4"></div>
              <div className="h-4 bg-[rgba(157,157,245,0.15)] rounded w-1/2"></div>
              <div className="h-4 bg-[rgba(157,157,245,0.15)] rounded w-5/6"></div>
            </div>
          ))
        ) : tasks.length === 0 ? (
          <div className="w-full text-center py-8 text-[#6b6a9c] font-medium bg-white/30 backdrop-blur-sm rounded-xl border border-dashed border-[rgba(157,157,245,0.3)]">
            Nenhuma tarefa cadastrada.
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex justify-between items-center w-full bg-white/80 backdrop-blur-md border border-[rgba(157,157,245,0.3)] rounded-xl p-5 shadow-[0_2px_5px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col gap-1.5 flex-1">
                <p className="text-[0.9rem] text-[#6b6a9c] font-medium">Responsável: <span className="text-[#1e1b4b] font-bold ml-1">{task.name}</span></p>
                <p className="text-[0.9rem] text-[#6b6a9c] font-medium">Tarefa: <span className="text-[#1e1b4b] font-bold ml-1">{task.task}</span></p>
                <p className="text-[0.9rem] text-[#6b6a9c] font-medium">Prazo: <span className="text-[#1e1b4b] font-bold ml-1">{task.deadline}</span></p>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="bg-red-500/10 border border-red-500/15 text-red-500 w-[2.35rem] h-[2.35rem] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-150 ease-in-out ml-4 hover:bg-red-500 hover:border-red-600 hover:text-white" 
                aria-label="Deletar tarefa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[1.1rem] h-[1.1rem]"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
