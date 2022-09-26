import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/card"

const pageTitle = "Home"

const IndexPage = () => {
  return (
    <Layout pageTitle={pageTitle} >
      <Card>Hello</Card>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>{pageTitle}</title>
