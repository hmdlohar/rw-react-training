import React from 'react'
import ErrorPlaceHolder from './ErrorPlaceHolder'
import LoadingPlaceholder from './LoadingPlaceholder'


interface ILoadingErrorPlaceholder {
    isLoading?: boolean
    error?: any
    children: any
    loadingComponent?: any
    errorComponent?: any
}

export default function LoadingErrorPlaceholder(props: ILoadingErrorPlaceholder) {
    return (
        <>
            {props.isLoading ?
                (props.loadingComponent || <LoadingPlaceholder />)
                :
                (props.error ?
                    (props.errorComponent || <ErrorPlaceHolder ex={props.error} />)
                    :
                    props.children
                )
            }
        </>
    )
}
