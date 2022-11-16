import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'

import { Box, VStack } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { strapi } from '@utils/lib'
import { Section } from '@components/shared'

export const getStaticProps = async () => {

	const overviewData = await strapi.findOne('overview')

	return {
		props: {
			sections: overviewData.sections
		}
	}
}

type OverviewPageProps = InferGetStaticPropsType<typeof getStaticProps>

const OverviewPage: NextPage<OverviewPageProps> = (props) => {

	let counter = 0

	return (<>

		<DefaultLayout
			title='Overview'
		>

			<VStack spacing={10}>

				{props.sections?.map((section, index) => (
					<Section
						key={index}
						title={section.title}
						text={section.text}
						image={section.image ? `${process.env['NEXT_PUBLIC_STRAPI_URL']}${section.image.url}` : null}
						isImgFirst={section.image ? counter++ % 2 === 0 : undefined}
					/>
				))}

			</VStack>
		</DefaultLayout>		
	
	</>)
}

export default OverviewPage