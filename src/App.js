import {BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./components/project";
import Edit from "./components/edit";
import Employee from "./components/employee";
function App(){
    return (
        <div>
          
            <BrowserRouter>
        <Routes>
            <Route path="/" element={<Project/>}/>
            <Route path="/project/edit/:id" element={<Edit/>}/>
            <Route path="/departments/:id/employees" element={<Employee/>}/>
        </Routes>
       </BrowserRouter>
     

        </div>
       

    );
}

export default App;