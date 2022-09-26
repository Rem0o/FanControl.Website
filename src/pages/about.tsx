import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/card";
import ControlCard from "../components/controlCard"

const pageTitle = "About";

const AboutPage = () => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex space-x-4">
        <Card>
          I love juju {"<3"}
        </Card>
        <Card>
          Rémi is coooool
        </Card>
        <Card>
          Rémi a besoin de se faire faire la nuque
        </Card>
        <Card background="bg-blue-400">
          <div className="w-full text-white">hi</div>
        </Card>
        <ControlCard/>
      </div>

    </Layout>
  )
}

export default AboutPage

export const Head: HeadFC = () => <title>{pageTitle}</title>
