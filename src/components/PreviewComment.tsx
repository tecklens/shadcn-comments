import type {ReactNode} from "react";
import React, {useEffect, useState} from "react";
import {Fragment, jsx, jsxs} from "react/jsx-runtime";
import type {EvaluateOptions} from "@mdx-js/mdx";
import {evaluate} from "@mdx-js/mdx";
import type {MDXProps} from "mdx/types";

type ReactMDXContent = (props: MDXProps) => ReactNode;
type Runtime = Pick<EvaluateOptions, "jsx" | "jsxs" | "Fragment">;

const runtime = { jsx, jsxs, Fragment } as Runtime;

const PreviewComment: any = ({ source = "hêlo" }) => {
  const [MdxContent, setMdxContent] = useState<ReactMDXContent>(() => () => null);

  useEffect(() => {
    evaluate(source, runtime).then(r => {
      setMdxContent(() => r.default)
    });
  }, [source]);

  // @ts-ignore
  return <MdxContent />;
};

export default PreviewComment