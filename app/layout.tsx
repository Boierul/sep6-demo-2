import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import {RecoilContext} from "@/app/recoilContext";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Best Movies | Your movie search engine',
    description: 'Some description that is meaningful',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <RecoilContext>
            {children}
        </RecoilContext>
        </body>
        </html>
    )
}
