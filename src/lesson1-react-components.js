import React from 'react';

/**
 * Create a simple react element using React API
 */
const element = React.createElement(
    "div",
    null,
    React.createElement(
        "a",
        {href: "https://google.com"},
        "Google!"
    )
)

/**
 * Just a function that returns react element, but that is not a Component yet
 */
const getInnerElement = (text, link) => <div style={{backgroundColor: "red"}}>
    <a href={link}>{text}</a>
</div>

const element1 = <div>
    {getInnerElement("google", "google.com")}
    {getInnerElement("yande", "yandex.ru")}
</div>

/**
 * Simple react component
 */
const TestReactComponent = (props) => {
    console.log('[obabichev]', {props});
    return <div className="red-background" style={{padding: 50}}>
        <a href={props.link}>{props.children ? props.children : props.link.toUpperCase()}</a>
    </div>
}

/**
 * React component that expects another components as children
 */
const PageWrapper = (props) => {
    return <div>
        <div style={{height: 50, backgroundColor: "#CCCCCC"}}>
            <button>Login</button>
        </div>
        <div>
            {props.children}
        </div>
    </div>
}

/**
 * Combination of some components
 */
const app = <PageWrapper>
    <div>
        <TestReactComponent link="google.com">
        <span>
            Hello to
            <span style={{color: "green"}}> Google!</span>
        </span>
        </TestReactComponent>
        <TestReactComponent link="yandex.ru"/>
    </div>
</PageWrapper>


/**
 * Example of conditional rendering with react components
 */
const ConditionalRenderingComponent = (props) => {
    if (props.value && props.value > 10) {
        return <div style={{backgroundColor: "red"}}>More than 10 ({props.value})</div>
    }

    return <div>No more than 10 ({props.value})
        {typeof props.value !== "number" && <div>
            Because it is not number
        </div>}
    </div>
}

/**
 * Class component. Such an approach is not common anymore.
 */
class TestClassComponent extends React.Component {
    render() {
        return <div>
            Hallo from Class Component {this.props.value}
            {this.props.value > 0 && <TestClassComponent value={this.props.value - 1}/>}
        </div>
    }
}