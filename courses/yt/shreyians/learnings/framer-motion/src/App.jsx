import { motion, useScroll } from "motion/react"
import './App.css';

const App = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="p-20 font-mono text-white text-center">
      <motion.div
        style={{
          scaleX: scrollYProgress
        }}
        className="bg-red-500 origin-left top-0 left-0 w-full h-3 fixed"></motion.div>
      {/* <motion.div className='box'
        initial={{}}
        animate={{
          x: [0, 300, 300, 0, 0],
          y: [0, 0, 300, 300, 0],
          rotate: [0, 360, 0, -360, 0]
        }}
        transition={{
          duration: 4,
          delay: 1
        }}
        whileHover={{
          backgroundColor: 'green'
        }}
        whileTap={{
          scale: '1.8'
        }}
        drag
        dragConstraints={{
          left: 0,
          top: 0,
          right: window.innerWidth,
        }}
        dragDirectionLock='true'
        whileDrag={{
          scale: '0.8'
        }}
      ></motion.div>
      <motion.div className='circle' animate={{
        x: 120, rotate: 150,
      }}
        transition={{ duration: 3, delay: 1 }}></motion.div>
         */}
      <h2 className="text-4xl font-bold mb-8">Survey Corps</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, quis. Ipsum earum, iure excepturi quam velit reprehenderit sint, dignissimos quis nisi possimus fugiat eaque. Quibusdam esse necessitatibus distinctio. Minima non vero odit quas odio velit eos, facere nesciunt mollitia rem saepe deleniti eaque culpa vel? Architecto quia officiis alias modi ea eveniet non aut, nihil ratione consequatur nam? Recusandae possimus magnam optio a fuga quaerat accusamus ipsum pariatur, saepe incidunt distinctio maxime nulla corrupti ipsa odio minima itaque similique perspiciatis quidem. Ex asperiores quasi ea totam provident, soluta assumenda nulla, eaque velit praesentium ut dolore laudantium illum, aliquam distinctio deleniti tempora debitis sunt qui possimus eligendi. Officia.
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nesciunt dolores ut repellendus veniam ducimus incidunt, atque ipsa dignissimos dolorem placeat distinctio. Porro sint iste explicabo ipsam eveniet vel quisquam nisi nostrum, reiciendis qui inventore veritatis eum vitae sunt recusandae cum minima impedit asperiores, tempora in illo? Consectetur sequi nisi, totam cum enim nihil culpa explicabo magni! Recusandae voluptate quae porro fugiat doloremque ad ratione quos dolor earum delectus quam consectetur quo magnam quaerat, vel, excepturi odio cupiditate temporibus atque? Rerum nisi architecto ad repudiandae sed beatae error vel earum voluptates repellendus velit a corrupti ea molestias consequuntur dolor nobis necessitatibus, consequatur enim accusamus excepturi similique aliquid eaque ut! Quos, quas praesentium officia quaerat illo natus ipsum est non? Eos quod facere possimus optio dolore voluptatibus ea enim impedit voluptatem hic dolorum voluptas doloremque, quam repudiandae animi, doloribus, dolores pariatur culpa earum sequi expedita maiores vitae in asperiores. Unde asperiores labore ut.</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, totam facere. Reprehenderit debitis accusamus, illo esse ducimus atque veritatis vitae ratione dicta voluptate fuga vero omnis ullam voluptates iusto quae maxime incidunt perspiciatis aspernatur? Esse, enim repellendus. Dolores itaque possimus cum odit totam culpa omnis magni animi autem natus commodi placeat sint asperiores eius excepturi voluptates iste sequi, voluptate dignissimos illum laudantium dolore unde nulla aperiam. Nam consequuntur sint ducimus maxime dolores. Odit atque exercitationem eveniet quod aperiam, cum harum quo nobis iusto tempora alias unde enim. Sint maiores aliquam est assumenda.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore necessitatibus vitae eaque, id rem natus deleniti et sint sunt dolore molestiae maiores repudiandae, ab omnis eveniet perferendis alias in ducimus distinctio nam voluptatibus molestias maxime voluptas nostrum. Molestiae, quisquam dolore. Nesciunt qui possimus ducimus. Nesciunt doloremque deleniti vel aliquam, provident dignissimos ex similique voluptatem quas debitis ipsam in velit ullam accusantium iusto tempore, cum quidem ducimus cumque corrupti quisquam? Est explicabo officiis eos voluptas, ducimus ratione voluptatibus ullam autem beatae, esse, rem vitae officia cum facere enim tenetur possimus! Cum pariatur quis aut, error quidem quia labore enim beatae veniam quam nisi consequuntur ut debitis amet dolor ipsa autem. Nulla, autem rerum aut quaerat a explicabo eaque odio nisi reprehenderit est? Necessitatibus iusto quo architecto omnis. Excepturi, repellendus cumque assumenda eius distinctio praesentium adipisci. Assumenda iusto, quod vel nulla quia fugiat impedit aliquam consectetur, beatae libero saepe sed est magnam explicabo a repudiandae? Tempore eos aut ratione officia quasi incidunt adipisci ullam vitae, quia rem dignissimos magnam iure! Doloremque asperiores rerum, repudiandae distinctio sit blanditiis deserunt excepturi? Nulla, dolorum. Aut voluptas culpa id adipisci atque voluptatem, tempora ducimus. Veritatis officiis voluptas quae incidunt, obcaecati laborum?
      </p>
    </div>
  )
}

export default App