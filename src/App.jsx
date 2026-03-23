import {Sidebar} from "./components/Sidebar.jsx";
import {NewProject} from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: []
    })

    function handleStartProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: null
        }))
    }

    let content

    if (projectsState.selectedProjectId === null) {
        content = <NewProject />
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartProject} />
    }

  return (
    <main className="h-screen my-8 flex gap-8">
        <Sidebar onStartAddProject={handleStartProject} />
        {content}
    </main>
  );
}

export default App;
