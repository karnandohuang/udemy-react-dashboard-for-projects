import Button from "./Button.jsx";

export function Sidebar ({ projects, onStartAddProject, onSelectProject, selectedProjectId }) {
    return (
        <>
            <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
                <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
                <div>
                    <Button onClick={onStartAddProject}>
                        + Add Project
                    </Button>
                </div>
                <ul className="mt-8">
                    {projects.map(({ id, title }) => {
                        let cssClasses = "w-full text-left px-2 py-1 rounded-md my-1 "
                        if (id === selectedProjectId) {
                            cssClasses += "bg-stone-800 text-stone-200"
                        } else {
                            cssClasses += "text-stone-400 hover:bg-stone-800"
                        }
                        return <li
                            key={id}
                            className={cssClasses}
                            onClick={() => onSelectProject(id)}
                        >
                            {title}
                        </li>
                    })}
                </ul>
            </aside>
        </>
    )
}