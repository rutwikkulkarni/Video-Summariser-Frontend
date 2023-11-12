import {useState} from "react";
import {Button, Card, CardBody, CardHeader, Flex, Heading, Input, Spinner, Text} from "@chakra-ui/react";

function App() {
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')
    const [summary, setSummary] = useState('')
    const [summaryTitle, setSummmaryTitle] = useState('')

    const summarise = async () => {
        setLoading(true)
        let response = await fetch('http://localhost:5000/summarise/youtube?' + new URLSearchParams({
            url: url
        }))
        let body = await response.json()
        setSummmaryTitle(body['title'])
        setSummary(body['summary'])
        setLoading(false)
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
            { loading ?
                <Spinner
                    mt={4}
                /> :
                <Button
                    mt={4}
                    onClick={() => summarise()}
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
