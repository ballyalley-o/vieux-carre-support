import { ReactNode } from "react"

interface TitleWithIconProps {
    subject: string
    icon   : ReactNode
}

const TitleWithIcon = ({ subject, icon }: TitleWithIconProps) => {
    return (
         <div className="flex justify-between items-center">
            <h1 className={'text-3xl font-bold text-vcsblue'}>{subject}</h1>
            {icon}
        </div>
     );
}

export default TitleWithIcon