import { strapi } from '@utils/lib'
import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage, PreviewData } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect } from 'react'

import { Box, Flex, Text } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'

export const getServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {

	const file = await strapi.getBinaryFromDownloadHash(ctx.params!.hash as string)

	return {
		props: {
			validFile: !!file
		}
	}
}

type DownloadPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const DownloadPage: NextPage<DownloadPageProps> = ({ validFile }) => {

	const router = useRouter()

	useEffect(() => {
		if (validFile) {
			router.push(`/api/download/${router.query.hash}`)
		}
	}, [])

	return (<>

		<DefaultLayout
			title='Download'
		>

			<Flex h='60vh' alignItems='center'>
				<Text fontSize='1.5em'>
					{validFile ? 
						<>Download has started!</>
						:
						<Box as='span' color='red.400'>Invalid download link (or file has expired).</Box>
					}
				</Text>
			</Flex>

		</DefaultLayout>		
	
	</>)
}

export default DownloadPage