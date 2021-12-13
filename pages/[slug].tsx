import { BuilderComponent, builder } from "@teko-builder/client";
import { GetServerSideProps } from "next";
import React from "react";
import "@teko-builder/client/dist/base.css";
interface LandingProps {
  page: any;
}

const Landing: React.FC<LandingProps> = ({ page }: LandingProps) => {
  if (!page) return null;
  else {
    return <BuilderComponent content={page?.pbConfig || {}} />;
  }
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // get information provided by middleware
  builder.init("setupzone", {
    env: "production",
  });
  const { slug } = context.params;
  // call to page-build bff to get page data by slug
  try {
    const { page, redirect } = await builder.getPublicPage({
      slug,
      device: "desktop",
    });
    if (!!redirect) {
      return {
        redirect: {
          statusCode: 301,
          destination: redirect,
        },
        props: {},
      };
    }
    return {
      props: {
        page: page,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

export default Landing;
