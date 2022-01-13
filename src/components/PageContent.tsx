import React from 'react'

interface ComponentProps {}

const PageContent: React.FC<ComponentProps> = ({ children }) => <section className="flex flex-col items-center mx-auto mt-4">{children}</section>

export default PageContent
