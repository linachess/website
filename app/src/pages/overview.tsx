import type { InferGetServerSidePropsType, NextPage } from 'next'

import { VStack } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { Section } from '@components/shared'
import { strapi } from '@utils/lib'

export const getServerSideProps = async () => {

	const overviewData = await strapi.findOne('overview')

	return {
		props: {
			version: await strapi.getCurrentVersion(),
			sections: overviewData.sections
		}
	}
}

type OverviewPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const OverviewPage: NextPage<OverviewPageProps> = (props) => {

	let counter = 0

	return (<>

		<DefaultLayout
			title='Overview'
			version={props.version}
		>

			<VStack spacing={10}>

				{props.sections?.map((section, index) => (
					<Section
						key={index}
						title={section.title}
						text={section.text}
						textAlign='justify'
						image={section.image ? `${process.env['NEXT_PUBLIC_STRAPI_URL']}${section.image.url}` : null}
						isImgFirst={section.image ? counter++ % 2 === 0 : undefined}
						button={section.button}
					/>
				))}

			</VStack>
		</DefaultLayout>		
	
	</>)
}

export default OverviewPage