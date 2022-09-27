import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/card";
import ControlCard from "../components/demo/controlCard"

const pageTitle = "About";

const AboutPage = () => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex space-x-4">
        <Card>
          About...
        </Card>
      </div>

    </Layout>
  )
}

export default AboutPage

export const Head: HeadFC = () => <title>{pageTitle}</title>
