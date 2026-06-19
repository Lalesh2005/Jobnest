import {useState} from "react";
import Jobcard from './components/Jobcard.jsx';
const jobs =[
  {
    company:"Google",
    role:"Backned Intern"
  },
  {
    company:"Microsoft",
    role:"SDE"
  }
]


function App(){
  const [search,setSearch] = useState(0);
  return(
    <div>
      <h1>Jobnest</h1>
      {/* <Jobcard
      // company="Google"
      // role="SDE"
      jobs.map({comapny,role})=>{

      }
      /> */}
      {
          jobs.map((jobs,index)=>(
            <Jobcard
            index={index}
            company={jobs.company}
            role={jobs.role}
            />
          )) 
      }
      <input
        type="text"
        placeholder="search"
        onChange={(e)=>{
          setSearch(e.target.value)
        }}
      />
      <h1>{search}</h1>
    </div>
  )
}
export default App;

