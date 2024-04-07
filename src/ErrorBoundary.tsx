import React, {Component, PropsWithChildren} from "react";

export class ErrorBoundary extends Component<PropsWithChildren<any>> {
    state: {hasError: boolean}
    constructor(props: {children: JSX.Element}) {
        super(props);
        this.state = {hasError: false}
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        alert(error)
    }

    static getDerivedStateFromError(){
        return {hasError: true}
    }

    render() {

        if(this.state.hasError){
            return <h2>Ooops! Something went wrong...</h2>
        }

        return this.props.children
    }
}