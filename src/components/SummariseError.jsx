import {Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";

export default function SummariseError(){
    return (
        <Alert
            status='error'
            mt={2}
            width={{base: '90%', lg: '60%'}}
            borderRadius={3}
        >
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to fetch video. Either the server is down or the URL is invalid.</AlertDescription>
        </Alert>
    )
}