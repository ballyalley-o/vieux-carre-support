import { JSX, ReactNode, useState } from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"

type FormSelectProps<T, V = string> = {
    name        ?: string
    label       ?: string
    options      : T[]
    value        : T | null;
    defaultValue : V
    selectedLabel: ReactNode
    onChange     : (value: T) => void
    getValue     : (option: T) => V
    getColor    ?: (option: T) => string
    getIcon     ?: (option: T) => JSX.Element
    onToggle    ?: (open: boolean) => void
    renderList   : (options: T[], onSelect: (value: T) => void) => JSX.Element
    disabled    ?: boolean
}

function FormSelect<T, V>({ name, label, options, value, onChange, getValue, disabled = false, defaultValue, onToggle, renderList, selectedLabel }: FormSelectProps<T, V>) {
    const [open, setOpen] = useState(false)
    const selectedValue   = value ? getValue(value) : defaultValue
    const dropdownIcon    = open ?  <FaAngleUp/> : <FaAngleDown/>

     const toggleOpen = (state: boolean) => {
       setOpen(state)
       onToggle?.(state)
     }
    return (
      <div className={"relative"}>
       {label &&  <label className={'text-md py-4 mx-2 font-semibold'}>{label}</label>}
        <button type="button" className={'w-full border p-3 input-default flex justify-between items-center'} onClick={() => !disabled && toggleOpen(!open)} disabled={disabled}>
          <span className={'flex items-center gap-2'}>{selectedLabel}</span>
          {dropdownIcon}
        </button>
        {open && (
          <div className="absolute z-10 w-full mt-1">
            {renderList(options, (option: T) => { onChange(option); toggleOpen(false) })}
          </div>
        )}
        {name && <input type="hidden" name={name} value={selectedValue as PriorityType} />}
      </div>
    )
}

export default FormSelect