import { cn } from "lib/utility"

interface FormViewFieldProps {
  label     : string
  value     : string
  className?: string
}

const FormViewField = ({ label, value, className }: FormViewFieldProps) => {
    return (
      <div className={'text-gray-700'}>
        <h2 className="text-lg font-semibold mb-2">{label}</h2>
        <p className={cn(className ? className : 'text-xl')}>{value}</p>
      </div>
    )
}



export default FormViewField