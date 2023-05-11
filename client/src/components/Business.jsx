import React from 'react'
import { features } from '../constants'
import styles, { layout } from '../style'
import Button from './Button'
import { fadeIn, staggerContainer } from '../utils/motion';
import { motion } from 'framer-motion';

const FeatureCard = ({icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} className='w-[50%] h-[50%] object-contain'/>
    </div>
    <div className='flex-1 flex flex-col ml-3'>
      <h4 className='font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1'>{title}</h4>
      <p className='font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1'>{content}</p>
    </div>
  </div>
)

const Business = () => {
  return (
    <section
     id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Focus on Business, <br className='sm:block hidden'/> Let's handle the money.</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>With our app, you can easily manage your funds and make transactions with ease. Our advanced algorithm analyzes your transactions and predicts your spending habits, allowing you to plan and budget better.</p>
        <Button styles="mt-10" text="Get Started"/>
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) =>  (
          <FeatureCard key={feature.id} {...feature} index={index}/>
        ))}
      </div>
    </section>
  )
}

export default Business