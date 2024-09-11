import React from "react";
import { useState, useEffect } from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

import type { FC, ReactNode } from "react";
import type { MDXProps } from "mdx/types";
import type { EvaluateOptions } from "@mdx-js/mdx";

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