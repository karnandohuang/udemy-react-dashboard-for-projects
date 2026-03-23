import {Sidebar} from "./components/Sidebar.jsx";
import {NewProject} from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    })

    function handleStartProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: null
        }))
    }

    function handleAddProject(projectData) {
        setProjectsState(prevState => {
            const newProject = {
                ...projectData,
                id: Math.random()
            }
            return {
                ...prevState,
                projects: [
                    ...prevState.projects,
                    newProject
                ],
                selectedProjectId: undefined
            }
        })
    }

    function handleCancelAddProject () {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined
            }
        })
    }

    function handleSelectProject (id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id
            }
        })
    }

    function handleDeleteProject () {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projects: prevState.projects.filter(p => p.id !== prevState.selectedProjectId),
                selectedProjectId: undefined
            }
        })
    }

    console.log(projectsState)

    function handleAddTask (text) {
        setProjectsState(prevState => {
            const taskId = Math.random()
            const newTask = {
                text: text,
                id: taskId,
                projectId: prevState.selectedProjectId
            }
            return {
                ...prevState,
                tasks: [...prevState.tasks, newTask]
            }
        })
    }

    function handleDeleteTask (taskId) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(t => t.id !== taskId),
            }
        })
    }

    let content

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartProject} />
    } else {
        content = <SelectedProject
            project={projectsState.projects.find(project => project.id === projectsState.selectedProjectId)}
            tasks={projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId)}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
        />
    }

  return (
    <main className="h-screen my-8 flex gap-8">
        <Sidebar projects={projectsState.projects} onStartAddProject={handleStartProject} onSelectProject={handleSelectProject} />
        {content}
    </main>
  );
}

export default App;
