import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
    return <div className="max-w-4xl mx-auto min-h-screen p-4">{children}</div>
}

export default Container;