import {useState} from "react";
import {
    Alert, AlertDescription,
    AlertIcon, AlertTitle, AspectRatio, Box,
    Button,
    Card,
    CardBody,
    CardHeader, Flex,
    Heading,
    Input,
    Stack, Text
} from "@chakra-ui/react";
import {getSummary} from "./api/apiRequests.js";
import Summary from "./components/Summary.jsx";
import SummariseError from "./components/SummariseError.jsx";

function App() {
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')
    const [summary, setSummary] = useState([])
    const [summaryTitle, setSummmaryTitle] = useState('')
    const [error, setError] = useState(false)

    const summarise = async () => {
        setError(false)
        setLoading(true)
        let response
        try {
            response = await getSummary(url)
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

        let summary = JSON.parse(body['summary'])
        console.log(summary)
        setSummary(summary)
    }

    return (
        <Flex direction='column' justify='center' alignItems='center' >
            <Heading size='2xl' mt={2}>YouTube Summariser</Heading>
            <Text mt={2} fontSize={{base: 'sm', md: 'md'}}>Copy & paste the URL of the YouTube video below to generate a summary.</Text>

            <Flex mt={2} width={{base: '90%', lg: '60%'}}>
                <Input
                    placeholder='YouTube URL'
                    onChange={e => setUrl(e.target.value)}
                    borderRightRadius={0}
                />
                <Button
                    onClick={async () => await summarise()}
                    backgroundColor='green.500'
                    color='white'
                    isLoading={loading}
                    loadingText='Generating...'
                    borderLeftRadius={0}>
                    Summarise
                </Button>
            </Flex>

            { error ?
                <SummariseError /> :
                <div></div>
            }

            { summary.length === 0 ?
                <div></div> :
                <Summary summaryTitle={summaryTitle} summary={summary} url={url} />
            }

        </Flex>
    )
}

export default App
