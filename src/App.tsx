import "./App.css";
import CalendarSummary from "./CalendarSummary";
import {ErrorBoundary} from "./ErrorBoundary";

function App() {
    return (
        <div className="App" style={{maxWidth: "1000px", margin: "auto", padding: "0 1rem"}}>
            <ErrorBoundary fallback={<p>Couldn't fetch data.</p>}>
                <CalendarSummary />
            </ErrorBoundary>
        </div>
    );
}

export default App;
