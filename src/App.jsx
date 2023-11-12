import {useState} from "react";
import {
    Alert, AlertDescription,
    AlertIcon, AlertTitle,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Input,
    Spinner,
    Text
} from "@chakra-ui/react";

function App() {
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')
    const [summary, setSummary] = useState('')
    const [summaryTitle, setSummmaryTitle] = useState('')
    const [error, setError] = useState(false)

    const summarise = async () => {
        setError(false)
        setLoading(true)
        let response
        try {
            response = await fetch('http://localhost:5000/summarise/youtube?' + new URLSearchParams({
                url: url
            }))
        } catch (e) {
            setLoading(false)
            setError(true)
            console.error(e)
            return
        }
        console.log(response)
        setLoading(false)
        if (response.status !== 200) {
            setError(true)
            return
        }

        let body = await response.json()
        setSummmaryTitle(body['title'])
        setSummary(body['summary'])
    }

    return (
        <Flex direction='column' justify='center' alignItems='center' >
            <Heading size='2xl' mt={2}>YouTube Summariser</Heading>
            <Text mt={2} fontSize={{base: 'sm', md: 'md'}}>Copy & paste the URL of the YouTube video below to generate a summary.</Text>
            <Input
                mt={2}
                width={{base: '90%', lg: '60%'}}
                placeholder='YouTube URL'
                onChange={e => setUrl(e.target.value)}
            />
            { error ?
                <Alert
                    status='error'
                    mt={2}
                    width={{base: '90%', lg: '60%'}}
                    borderRadius={3}
                >
                    <AlertIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Failed to fetch video. Either the server is down or the URL is invalid.</AlertDescription>
                </Alert> :
                <div></div>
            }

            { loading ?
                <Spinner
                    mt={4}
                /> :
                <Button
                    mt={4}
                    onClick={async () => await summarise()}
                    backgroundColor='green.500'
                    color='white'
                >
                Summarise
            </Button> }
            {
                summary === '' ?
                    <div></div> :
                    <Card width={{base: '90%', lg: '60%'}} mt={6}>
                        <CardHeader>
                            <Heading size='md'>{summaryTitle}</Heading>
                        </CardHeader>
                        <CardBody pt={1}>
                            <Text>{summary}</Text>
                        </CardBody>
                    </Card>
            }

        </Flex>
    )
}

export default App
