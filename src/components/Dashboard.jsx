import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useTodo } from "../hooks/useTodo";
import "../styles/Dashboard.scss";

export const Dashboard = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();
    const userId = session?.user?.id;
    
    const {
        todos,
        title,
        setTitle,
        addTodo,
        toggleTodo,
        deleteTodo,
    } = useTodo(userId);

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate('/')
        } catch (err) {
            console.error("Error signing out:", err.message);
        }
    };

    return (
        <div className="dashboard">
            <div className="inner-dashboard">
                <h1>Dashboard</h1>
                <p>Welcome, {session?.user?.email}</p>
                <button onClick={handleSignOut} className="signout-button">Sign Out</button>

                <div className="todo-panel">
                    <h2>My Todos</h2>
                    <form onSubmit={addTodo} className="todo-form">
                        <input
                            type="text"
                            placeholder="New todo..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button type="submit">Add</button>
                    </form>

                    <ul className="todo-list">
                        {todos.length === 0 ? (
                            <li className="todo-empty">No todos yet.</li>
                        ) : (
                            todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className={todo.is_complete ? "todo-item done" : "todo-item"}
                                >
                                    <button
                                        type="button"
                                        className="todo-toggle"
                                        onClick={() => toggleTodo(todo)}
                                        aria-pressed={todo.is_complete}
                                    >
                                        {todo.is_complete ? "Undo" : "Done"}
                                    </button>
                                    <span className="todo-title">{todo.title}</span>
                                    <button
                                        type="button"
                                        className="todo-delete"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
};