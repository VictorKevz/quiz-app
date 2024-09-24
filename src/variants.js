export const toastVariants = {
    hidden:{opacity:0,x:"100%"},
    visible:{
        opacity:1,x:0,
        transition:{
            type:"spring",
            duration:0.6,
            damping:15,
            stiffness:300,
        },
        
    },
    exit:{opacity:0,x:-400}
    
}