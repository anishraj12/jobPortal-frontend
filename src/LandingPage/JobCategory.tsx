import { Carousel, CarouselSlide } from '@mantine/carousel'
import React from 'react'
import { jobCategory } from '../Data/Data'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

function JobCategory() {
  return (
    <div className='mt-20 pb-5'>
        <div className='text-4xl text-center mb-3 font-semibold text-mine-shaft-100'>Browse <span className='text-bright-sun-400'>Job</span> Category</div>
        <div className='text-lg mb-10 text-mine-shaft-300 text-center mx-auto w-1/2 '>Explore diverse job oppertunities tailored to your skills. Start your carrer journey today!</div>
       
        <Carousel slideGap="md" slideSize="22%" loop className='focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400
        [&_button]:!border-none [&_input]:hover:opacity-75 [&_button]:hover:opacity-0 hover:[&_button]:opacity-100' 
        nextControlIcon={<IconArrowRight className='h-8 w08'></IconArrowRight>}
        previousControlIcon={<IconArrowLeft className='h-8 w-8'></IconArrowLeft>}>
            {
                jobCategory.map((category,index)=><CarouselSlide>
                    <div className='flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] !shadow-bright-sun-300 my-5 transition duration-300 ease-out'>
                    <div className='p-2 bg-bright-sun-300 rounded-full'>
                       <img className='h-8 w-8' src={`./Category/${category.name}.png`} alt={category.name} />
                    </div>
                    <div className='text-mine-shaft-100 text-xl font-semibold'>{category.name}</div>
                    <div className='text-sm text-center text-mine-shaft-300'>{category.desc}</div>
                    <div className='text-bright-sun-300 text-lg'>{category.jobs}+ new Job posted</div>
                    </div>

                </CarouselSlide>)
            }

        </Carousel>
      

       </div>
       
    
  )
}

export default JobCategory