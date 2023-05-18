'use client'

import React from "react";
import {RecoilRoot} from "recoil";

type Props = {
    children?: React.ReactNode
}

export const RecoilContext = ({ children }: Props) => {
    return <RecoilRoot>{children}</RecoilRoot>
}