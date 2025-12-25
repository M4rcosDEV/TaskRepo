import { useEffect, useState } from "react"
import { Calendario } from "./components/Calendario"
import { DialogLaunch } from "./components/DialogLaunch"
import { TableLaunch } from "./components/TableLaunch"
import { Toaster } from "./components/ui/sonner"
import type { Launch } from "./interfaces/Launch"
import { api } from "./api"
import { Button } from "./components/ui/button"
import { toast } from "sonner"
import Chart from "./components/Chart"

interface ChartData{
  name: string,
  value: number
}

function App() {

  const [dateInit, setDateInit] = useState<Date>()
  const [dateEnd, setDateEnd] = useState<Date>()
  const [dataLaunch, setDataLaunch] = useState<Launch[]>();
  const [dataLaunchFilter, setDataLaunchFilter] = useState<Launch[]>();

  const [chartLaunch, setChartLaunch] = useState<ChartData[]>();

  const [atualizar, setAtualizar] = useState<number>(0)

  const [datesActive, setDatesActive] = useState<boolean>(true)

  const refresh = ()=>{
    setAtualizar((prev) => prev + 1)
    console.log(atualizar)
  }

  const loadLaunchs = async() => {

    try {
      const result = await api.get("/launch")
      
      setDataLaunch(result.data)
      setDataLaunchFilter(result.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    loadChart()
    loadLaunchs()
  }, [atualizar])

  useEffect(() => {
    //console.log(dataLaunch)
  }, [dataLaunch])

  const dadosFiltrados = dataLaunchFilter?.filter((item) => {
    if (!dateInit || !dateEnd) {
      return true
    }

    const inicio = dateInit
    inicio.setHours(0, 0, 0, 0)

    const fim = dateEnd
    fim.setHours(23, 59, 59, 999)

    const dataItem = new Date(item.date)

    return dataItem >= inicio && dataItem <= fim
  })

  useEffect(()=>{
    if(!dateInit || !dateEnd){
      return
    }

    setDatesActive(false)
  }, [dateInit, dateEnd])

  const limpar = () => {
    setDateInit(undefined)
    setDateEnd(undefined)
    setDatesActive(true)
    loadLaunchs()
  }


  const loadChart = async()=>{

    try {
      const result = await api.get("/launch/chart")
      
      setChartLaunch(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className="text-center text-2xl ">Resumo financeiro do Mês</h1>

      <div className="flex h-full justify-center gap-10 mt-10 items-end">
        <Calendario label="Data inicio" date={dateInit} onChange={setDateInit}/>
        <Calendario label="Data fim" date={dateEnd} onChange={setDateEnd}/>
        <Button onClick={limpar}>Limpar</Button>
      </div>

      <div className="flex h-full items-center justify-center gap-10 mt-10">
        <div className="w-125">
          <Chart data={chartLaunch}/>
        </div>
    
        <div className="flex flex-col gap-2">
          <TableLaunch data={datesActive ? dataLaunch : dadosFiltrados}/>
          <div className="place-items-end">
            <DialogLaunch refresh={refresh}/>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default App
