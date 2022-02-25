import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { getPackages } from '../../redux/slices/packages'
import { dispatch, RootState, useSelector } from '../../redux/store'
import { IPackage } from '../../types/Packages'

interface IPackageAutoComplete {
    value: any
    onChange: (value: any) => void
    onBlur: (value: any) => void
    label: string
}

export default function PackageAutoComplete(props: IPackageAutoComplete) {
    const { lstPackage } = useSelector((state: RootState) => state.packages)

    useEffect(() => {
        if (!lstPackage)
            dispatch(getPackages())
    }, [lstPackage])

    if (!lstPackage)
        return <div>Loading...</div>

    return (
        <Autocomplete
            disablePortal
            options={lstPackage}
            getOptionLabel={(option: IPackage) => {
                if (typeof option === "string")
                    return option;
                return option.name || ''
            }}
            isOptionEqualToValue={(option: IPackage, value: any) => option.name === value}
            value={props.value}
            onChange={(e, value: IPackage | null) => {
                props.onChange(value?.name || '')
            }}
            fullWidth
            renderInput={(params) => <TextField onBlur={props.onBlur}
                {...params}
                label={props.label} />}
        />
    )
}
