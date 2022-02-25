import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import lstState from '../../Data/state'

interface IStateAutoComplete {
    value: any
    onChange: (value: any) => void
    onBlur: (value: any) => void
    label: string
}

export default function StateAutoComplete(props: IStateAutoComplete) {
    return (
        <Autocomplete
            disablePortal
            options={lstState}
            value={props.value}
            onChange={(e, value) => {
                props.onChange(value)
            }}
            fullWidth
            renderInput={(params) => <TextField onBlur={props.onBlur}
                {...params}
                label={props.label} />}
        />
    )
}
