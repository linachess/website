import { getPromotedPrice } from '@core/utils/functions'
import { strapi } from '@utils/lib'
import type { InferGetStaticPropsType, NextPage } from 'next'
import * as yup from 'yup'

import { Box, Divider, Heading } from '@chakra-ui/react'
import { DefaultLayout } from '@components/layouts'
import { BuyForm } from '@components/modules'
import { Price } from '@components/shared'
import { Formik } from 'formik'

const formSchema = yup.object({
	firstName: yup.string().min(1).max(50).required(),
	lastName: yup.string().min(1).max(100).required(),
	email: yup.string().email().required(),
	discountCode: yup.string().optional(),
})

export const getStaticProps = async () => {

	const buyData = await strapi.findOne('buy')

	return {
		props: {
			price: buyData.currentPrice,
			promotedPrice: getPromotedPrice(buyData.currentPrice, buyData.currentDiscount) || null,
			buyable: buyData.buyable
		}
	}
}

type BuyPageProps = InferGetStaticPropsType<typeof getStaticProps>

const BuyPage: NextPage<BuyPageProps> = (props) => {

	return (<>

		<DefaultLayout
			title='Buy'
		>

			{props.buyable && <Heading mt='1rem' mb='2rem'>Buy LinaChess now!</Heading>}

			<Price 
				buyable={props.buyable}
				price={props.price}
				promotedPrice={props.promotedPrice}
			/>

			<Box mb='2rem'/>

			<Formik
				validationSchema={formSchema}
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					discountCode: '',
				}}
				onSubmit={console.log}
				render={({ values }) => (

					<BuyForm disabled={!props.buyable} values={values}/>
				)}
			/>


		</DefaultLayout>		
	
	</>)
}

export default BuyPage