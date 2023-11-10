import React, {ReactNode} from "react";

interface Props {
    fallback: string;
    children: ReactNode;
}
interface State {
    hasError: boolean;
}
export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: any, info: any) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
