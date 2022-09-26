import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/card"
import Hello from "../contents/hello.mdx"

const pageTitle = "Home"

const IndexPage = () => {
  return (
    <Layout pageTitle={pageTitle} >
      <Card>Hello</Card>
      <Hello></Hello>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>{pageTitle}</title>
