import { titleCase } from 'title-case'
import React from 'react'
import { noCase } from 'change-case'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

export const NavbarLink: React.FC<{ to: string } & React.ComponentProps<typeof NavLink>> = ({ to, children, className, ...props }) => (
    <NavLink to={to} className={({ isActive }) => classNames(className, { 'font-bold': isActive })} {...props}>
        {children}
    </NavLink>
)

export type LinkExtended = [route: string, children: JSX.Element | string]

export const NavbarLinks: React.FC<{ links: Array<string | LinkExtended> }> = ({ links }) => (
    <>
        {links
            .map((link): LinkExtended => (typeof link === 'string' ? [link, titleCase(noCase(link))] : link))
            .map(([route, children]) => (
                <NavbarLink key={route} to={route}>
                    {children}
                </NavbarLink>
            ))}
    </>
)
