import {AspectRatio, Box, Card, CardBody, CardHeader, Heading, Stack, Text} from "@chakra-ui/react";
import {getYouTubeEmbedUrl} from "../api/youtubeHelpers.js";

export default function Summary({summaryTitle, summary, url}) {
    return (
        <Card width={{base: '90%', lg: '60%'}} mt={6}>
            <CardHeader>
                <Heading size='lg'>{summaryTitle}</Heading>
            </CardHeader>
            <CardBody>
                <Box>
                    <AspectRatio maxW='520px' style={{ margin: 'auto', display: 'block' }}>
                        <iframe
                            title='video'
                            src={getYouTubeEmbedUrl(url)}
                            style={{ margin: 'auto', display: 'block' }}
                        />
                    </AspectRatio>
                </Box>
                <Stack spacing={8} mt={4}>
                    {
                        summary.map((item, _) => (
                            <Box>
                                <Heading size='md'>{item.title}</Heading>
                                <Text>{item.content}</Text>
                            </Box>
                        ))
                    }
                </Stack>
            </CardBody>
        </Card>
    )
}