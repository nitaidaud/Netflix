import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-center p-4 bg-black">
            <div className="w-full max-w-6xl">
                {children}
            </div>
        </div>
    )
}

export default Container
