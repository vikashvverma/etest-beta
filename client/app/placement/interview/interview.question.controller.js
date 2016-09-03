'use strict';

angular.module('etestApp')
  .controller('InterviewQuestionAnswerController', function ($scope,  $location, UtilityService) {
    var vm = this;
    vm.headerImageUrl='assets/images/interview-questions-programming-geek.jpeg';
    UtilityService.generateMeta({
      description: "Top interview question and how to answer. Check out a list of commonly asked interview questions and learn how to answer them.",
      title: "etest | Interview questions and how to answer!",
      keywords: "interview, questions, how to answer, list, top, questions, answer",
    });
    vm.share = UtilityService.share;
    vm.post = {
      url:  $location.absUrl(),
      name: 'etest | Interview questions and how to answer!',
    };
    var lastScrollTop = 0;
    $(window).scroll(function() {
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
        $('.interview-question-background-header').addClass('half-header');
      } else {
        $('.interview-question-background-header').removeClass('half-header');
      }
    });

    vm.questions = [
      {
        "question": "<strong>Describe your work style.</strong>",
        "answer": "Describe the positive aspects of your work style if possible, including: work ethic, attention to detail, interpersonal skills, skill sets (analytical or otherwise), leadership abilities, communication skills."
      },
      {
        "question": "<strong>Who are your role models? Why?</strong>",
        "answer": "If possible, cite role models you're truly passionate about - passion is contagious and will show you're being genuine. If the role model is in the same or similar industry as the company in an executive level position, even better."
      },
      {
        "question": "<strong>What is your biggest fear?</strong>",
        "answer": "Don't try to sugarcoat the answer by listing something ambitious as a fear, unless you truly mean it (for example: I fear being a great leader) - Share your real fears but discuss how you would overcome them."
      },
      {
        "question": "<strong>What do you aspire to be?</strong>",
        "answer": "Discuss your aspirations for the near, immediate and long term. You want to show them you are thinking of making an impact now as well as the future."
      },
      {
        "question": "<strong>Where do you see yourself in 5 years with your career?</strong>",
        "answer": "Be sure to paint a clear picture of your career vision that demonstrates your aspirations and goals that are realistic. This could emphasize increased responsibility, the ability to manage people and so forth"
      },
      {
        "question": "<strong>What motivates you to work?</strong>",
        "answer": "Describe what makes you passionate about the work. It could be the company's vision, the product, your desire to succeed, the clients, your peers and so on. They key is to first understand what internally motivates you to do your job and then to emphasize that in a positive way"
      },
      {
        "question": "<strong>Why do you want to work in this industry?</strong>",
        "answer": "Make sure you research the industry first. Then find at least 3 core things about that industry that you're passionate about (for example: how their solutions impact clients, their culture, the leadership, etc)"
      },
      {
        "question": "<strong>What do you know about this company?</strong>",
        "answer": "Research the company on Google by searching recent news (to remain current on them) and their website. Make sure you understand their products / services, vision, competitive differentiators, and work culture."
      },
      {
        "question": "<strong>Why do you want to work here?</strong>",
        "answer": "Know at least 3 strong reasons about why you want to work at the company. You could discuss their vision, products, the people, the career opportunities, and the culture."
      },
      {
        "question": "<strong>What are you passionate about?</strong>",
        "answer": "Ask yourself - what are your core passions that you wake up excited to act on each and every day? Ask yourself what makes you happy or drives you - is it helping others? Is it making money? Is it creating something? Is it about changing the world? Etc."
      },
      {
        "question": "<strong>What are your lifelong dreams?</strong>",
        "answer": "If your dreams don't relate to the job closely, make sure you highlight aspects of the job that will help develop the skills that will help you with your dreams. Ideally, you want your dreams to relate strongly to the career path you're interviewing for though."
      },
      {
        "question": "<strong>What is your biggest regret to date and why?</strong>",
        "answer": "Describe honestly the regretful action / situation you were in but then discuss how you proactively fixed / improved it and how that helped you to improve as a person/worker."
      },
      {
        "question": "<strong>What did you major in and why?</strong>",
        "answer": "Tell them your major and the motivations behind why you chose it and how it's helped to prep your of this potential job."
      },
      {
        "question": "<strong>What's been your biggest failure to date?</strong>",
        "answer": "Describe your biggest failure and discuss what you've learned from it and ideally how you've been successful since because of that lesson."
      },
      {
        "question": "<strong>What's been your biggest success to date?</strong>",
        "answer": "Talk about a story / experience about how you achieved success and be sure to share details on the results and outcome. Have it highlight a strong characteristic such as leadership, work ethic and so forth."
      },
      {
        "question": "<strong>How have you achieved your success?</strong>",
        "answer": "Discuss stories of how you've progressed over the years to achieve success. People relate best to stories."
      },
      {
        "question": "<strong>What type of personalities do you work best with and why?</strong>",
        "answer": "Think of which personalities you work best with (do you like outgoing, collaborative, personable working relationships and so forth?)"
      },
      {
        "question": "<strong>What are ideas or initiatives you've led and what was the outcome?</strong>",
        "answer": "Describe your most unique ideas and initiatives that had the best results for the company. Make sure you highlight your creativity, your results, your diligence and your ability to execute."
      },
      {
        "question": "<strong>Describe yourself in three words</strong>",
        "answer": "Pick three adjectives but then back up each with a real life story that demonstrates those characteristics."
      },
      {
        "question": "<strong>What is your biggest weakness?</strong>",
        "answer": "Be honest - tell them what you're weak at, but then explain to them how you've addressed that weakness or plan to in the near future"
      },
      {
        "question": "<strong>What skills do you bring to the table?</strong>",
        "answer": "Think of your skill sets with regards to: analytical skills, interpersonal skills, communication skills, computer skills, presentation skills, management skills, sales skills and so forth."
      },
      {
        "question": "<strong>What differentiates you from the competition?</strong>",
        "answer": "Think about what you bring to the table that you truly believe is unique - the easiest way to do is to think of your own personal stories that demonstrate your work ethic, skills, and dedication. Most people have some or all of those skills, but the unique stories are what make people stand out in interviews."
      },
      {
        "question": "<strong>What type of mentors do you seek out and why?</strong>",
        "answer": "Think of your top 3 mentors and what attributes they exhibit that you want to emulate. Common attributes include passion, desire, will, leadership, ability to influence others, intelligence."
      },
      {
        "question": "<strong>What are three positive characteristics you wish you had?</strong>",
        "answer": "The key here is to be honest about your wish list but then to describe how you plan on developing or growing those characteristics so that it becomes a reality. For example, I wish I had a stronger work ethic and I am reading a book right now about how to instill a better discipline around getting work done efficiently."
      },
      {
        "question": "<strong>What is the most important lesson / skill you've learned from school?</strong>",
        "answer": "Think of lessons learned in extra curricular activities, in clubs, in classes that had a profound impact on your personal development. For example, I had to lead a team of 5 people on a school project and learned to get people with drastically different personalities to work together as a team to achieve our objective."
      },
      {
        "question": "<strong>How do you stay up to date with industry?</strong>",
        "answer": "Discuss how you stay up to date by reading industry specific sites, magazines, and Google / yahoo news. Also make sure you stay up to date by reading the current news on the company's website."
      },
      {
        "question": "<strong>How do you feel about this company's vision?</strong>",
        "answer": "First find out where the company envisions itself in 3-5 years. If you can't find the vision of the company, that's probably a big question mark on the company itself. Once you do, identify how those company's visions align to your personal values and goals and then articulate how tightly correlated that is to the interviewer. For example - this company wants to be the #1 provider of green technology in the world and I feel strongly about that vision because we've got a chance to collectively impact the world to become a greener society and save our clients at the same time!"
      },
      {
        "question": "<strong>How would you impact the company?</strong>",
        "answer": "Consider first the role that you're applying for and then think of 3 ways where you could potentially impact the company's bottom line and top line. Then consider how you impact the company in a creative manner (how do you help productivity, the development of new products, marketing etc - of course this part is specific to the role you're applying for)"
      },
      {
        "question": "<strong>What do you feel you deserve to be paid?</strong>",
        "answer": "Do your research before answering this question - first, consider what the market average is for this job. You can find that by searching on Google (title followed by salary) and glassdoor.com and other websites. Then, consider this - based on your work experience and previous results, are you above average, if yes, by what % increase from your pay today from your perspective? Also - make sure if you aim high you can back it up with facts and your previous results so that you can make a strong case."
      },
      {
        "question": "<strong>What is your ideal working environment?</strong>",
        "answer": "Describe your ideal working environment. Do you like flexibility with work hours? Do you like working in a cubicle or independently? Do you like to be micro managed or empowered? Do you like to work on your own or in a team? Do you like being driven by metrics in your role? How much responsibility do you want?"
      },
      {
        "question": "<strong>If someone had to say something negative to you, what would they say?</strong>",
        "answer": "Again, be honest about sharing a story here about someone who may not have gotten along with you in the office here and explain how you were able to fix that relationship or change your attitude/action to be a better person / coworker."
      },
      {
        "question": "<strong>How have you shown yourself to be a leader?</strong>",
        "answer": "Think about a time where you've rallied a group of people around a cause / idea / initiative and successfully implemented it. It could be a small or large project but the key is you want to demonstrate how you were able to lead others to work for a common cause."
      },
      {
        "question": "<strong>How long do you envision yourself staying with this company?</strong>",
        "answer": "Understand that companies invest a lot of money into hiring the right staff. You want to emphasize that you are in it for the long run and you want to develop a career there and that it's not just a \"5 month stepping stone\" type of a job. You should be thinking how you're going to grow with that company for the next few years. After all, don't you want to invest your energy and time with a company that is going to continue to be successful and one that will help you grow?"
      },
      {
        "question": "<strong>What does \"collaboration with teammates\" mean to you?</strong>",
        "answer": "Drinking at the water cooler together is not the best example. Think of how you can collaborate with teammates to generate new ideas, to create initiatives to impact the business' success for the better (specifically in the department that you're applying for). For example, if you're applying to marketing, collaboration could mean discussing new ways of social media advertising to reach an audience of over a million people to strengthen the brand awareness of the company."
      },
      {
        "question": "<strong>What types of situations do you consider \"unfixable\"?</strong>",
        "answer": "Most situations are \"fixable\" - the ones that are not are typically related to business ethics (someone is cheating the company, someone is stealing, etc)"
      },
      {
        "question": "<strong>What classes did you enjoy most in college and why?</strong>",
        "answer": "Think back to the classes that either resonated with your passion or truly helped you to develop skills that you believe will help you in your career. Talk about those."
      },
      {
        "question": "<strong>What type of extracurricular activities are you a part of?</strong>",
        "answer": "Discuss the clubs / activities you were in, share a personal story about why you enjoyed it and then describe how it's helped shape you to be who you are today. For example, I enjoyed rock climbing because it taught me the value of practicing hard at a sport to become skilled in it. I bring this same diligence to my work approach today as well."
      },
      {
        "question": "<strong>How do you feel about giving back to the community?</strong>",
        "answer": "Describe your charitable activities to showcase that community work is important to you. If you haven't done one yet, go to www.volunteermatch.org - charitable work is a great way to learn about other people and it's an important part of society - GET INVOLVED!"
      },
      {
        "question": "<strong>How has school prepared you for this job role?</strong>",
        "answer": "Think back to how you've interacted with your peers to develop social skills, how you've worked with classmates on projects to develop teamwork and collaborative skills, how you've developed discipline through studying, how the courses have helped your creativity, and how the classes you've taken have impacted your analytical / problem solving / reasoning skills."
      },
      {
        "question": "<strong>Describe your academic achievements.</strong>",
        "answer": "Think of a time where you really stood out and shined within college. It could be a leadership role in a project, it could be your great grades that demonstrate your intelligence and discipline, it could be the fact that you double majored. Where have you shined?"
      },
      {
        "question": "<strong>What types of books or magazines do you typically read?</strong>",
        "answer": "Describe both your personal and professional favorites. If you happen to like professional books / magazines that relate to the industry of the company you're applying for - that's definitely worth highlighting."
      },
      {
        "question": "<strong>Describe your vision of your perfect dream job.</strong>",
        "answer": "Ideally, the role you're applying for either is that dream job or will help you get to it. If it's going to help you get there, describe the elements of that job role that you are passionate about so that it ties to the vision of what your dream job is. Be honest and talk about the type of work environment, management team / leadership, coworkers, culture, vision and products/services you'd like your dream job to entail."
      },
      {
        "question": "<strong>What is your perception of taking on risk?</strong>",
        "answer": "You answer depends on the type of company you're interviewing for. If it's a start up, you need to be much more open to taking on risk. If it's a more established company, calculated risks to increase / improve the business or minimal risks would typically be more in line."
      },
      {
        "question": "<strong>Do you value recognition or pay more? Why?</strong>",
        "answer": "Either preference is fine, but just remember you have to be able to explain why. If you say recognition, then back that up by describing how achievement really carries weight with you and how you like to feel valued in the work that you do because it validates that you're helping your teammates / customers and so forth. If you choose money, you can also explain that is important to you as validation and you can highlight how money is important to you because of your goals (financial security, providing for your family, and so forth). The key is to be authentic with your answer. However, if you say you value pay more because you're greedy - know that doesn't align usually to most company's values/vision."
      },
      {
        "question": "<strong>Describe what a bad work environment would look like to you.</strong>",
        "answer": "There could be a multitude of things to discuss here: Business ethics (wrongdoing), inconsiderate teammates, non-supportive management, a product that does not do what you're promising customers and so forth."
      },
      {
        "question": "<strong>How meticulous are you with details?</strong>",
        "answer": "Being detailed is important for many types of job roles. Typically you want to highlight how you've done that in previous roles. Example: \"Being meticulous is important to me. In my last job, I had to count the money in the register as a cashier to make sure it matched to the receipts down to the last penny.\" This was to ensure there wasn't any \"wrongdoing\" at the company by any of the cashiers and I was always accurate in my reports."
      },
      {
        "question": "<strong>How important is the vision of the company to you?</strong>",
        "answer": "It should be very important if you want a long standing career. Remember, you're investing your time, energy and earnings potential into a company so you want to make sure it's a sustainably successful company that will grow with you over the long haul."
      },
      {
        "question": "<strong>Do you have the ability to articulate a vision and to get others involved to carry it out?</strong>",
        "answer": "If yes, then share an example of how you've done so at work or college. If not, then discuss how you would do so. Example: \"I would first understand the goals of the staff members and then I would align those to the goals of the project / company. Then I would articulate the vision of that alignment and ask them to participate. From there, we would delegate tasks among the team and then follow up on a date and time to ensure follow through on the tasks. Lastly, we would review the results together.\""
      },
      {
        "question": "<strong>If you could offer suggestions on how to improve our company, what would you say?</strong>",
        "answer": "Examine the trends of the company and also where there may be some weaknesses (news articles often document this on public companies or look at their competitors to see how they're positioning it against them.) Then, once you have that knowledge, think creatively on how you could improve upon that weakness for them."
      },
      {
        "question": "<strong>What other companies are you interviewing at?</strong>",
        "answer": "Be open and share if you are indeed interviewing elsewhere, but do it in a humble way. This way you don't seem arrogant and the interviewer knows your skills are valued by other companies. This also tends to make them want you more as they know they are competing for your services."
      },
      {
        "question": "<strong>What do you know about our competition?</strong>",
        "answer": "Make sure you do your research on their competitors. You can find this by going to yahoo finance and click on their competitors (if they are public). From there research the news on them and go to their websites to understand their positioning on solutions and vision. You can also research local regional companies that are their competition (if it's a smaller private company on a regional scale) by simply typing in similar product offerings in the Google search followed by the city. Make sure you know their competitor's vision, products, culture, and how they are differentiated against their competition (and if they're not, how they could be)"
      },
      {
        "question": "<strong>What differentiates this company from other competitors?</strong>",
        "answer": "Be positive and nice about their competitors but also discuss how they are better than them and why they are the best choice for the customer. For example: \"Company XYZ has a good product, but I truly believe your company has a 3-5 year vision for your customer that aligns to their business needs.\""
      },
      {
        "question": "<strong>What are your thoughts on failure?</strong>",
        "answer": "Failure happens. It's a part of life. The key is understanding that you can't be perfect at everything and more importantly you're going to learn from failures to come out stronger."
      },
      {
        "question": "<strong>Describe a time where you've failed and bounced back.</strong>",
        "answer": "Share a story to describe this. For example: \"I accidentally made the mistake of telling a customer I could deliver on a solution set on a certain date and then later found out our business partner couldn’t do it on that time. I learned that I shouldn't rush into important decisions and promises like this and that I should always check with my counterparts first before committing to a statement of work.\""
      },
      {
        "question": "<strong>Have you ever mentored anyone before? If yes, describe the situation.</strong>",
        "answer": "Describe a time where you've helped someone else. Mentorships can be informal so as you've helped someone over a period of time that can certainly count. The key is to highlight how you utilized certain skills/attributes like coaching, teaching, patience, communication skills, and so forth to mentor that person."
      },
      {
        "question": "<strong>What are your thoughts on social media for this role?</strong>",
        "answer": "Without a doubt, social media is becoming more and more pervasive in our jobs. You should stress that social media is not appropriate for personal use at work. However, if the company embraces social media in certain departments (for example marketing), then you may want to discuss how you could use it for work (as long as it applies to your role)."
      },
      {
        "question": "<strong>Tell me about yourself.</strong>",
        "answer": "Talk about your school life, your work experience, and your passions. The key is to develop rapport with the interviewer by sharing your personal story of how you go to where you are today and where you want to go from here."
      },
      {
        "question": "<strong>Why are you the best fit for this job?</strong>",
        "answer": "Analyze the job responsibilities and match those to your skills sets. Then discuss how your experience and skills sets can truly create the best impact to the company in that specific job role. Impact could mean marketing impressions, sales, cutting costs, making products more efficiently, creating better customer service, engineering new designs that create customer excitement, etc."
      },
      {
        "question": "<strong>What will your ramp time be before you become a meaningful contributor?</strong>",
        "answer": "Companies want staff that can ramp quickly, but also want people who are realistic. So take into consideration how intense the job is and then give a good answer. For example, if you have simple responsibilities that don't require a huge development curve, then your ramp time will probably be shorter. If it's a complex set of skills that you need to develop, then your ramp time could be longer - the key is you have to explain why you believe that ramp time should be."
      },
      {
        "question": "<strong>What role do you see technology playing in this role?</strong>",
        "answer": "Technology is important to almost every job today but it's not meant to be abused. I believe it's important to increase productivity and not for personal use."
      },
      {
        "question": "<strong>How do you feel about technology at the workplace in general?</strong>",
        "answer": "It's a great enabler for us to collaborate better as a team, for us to reach customers more efficiently and frequently and I believe it can help any company become more efficient, leaner, and more productive."
      },
      {
        "question": "<strong>How do you inspire others to be better?</strong>",
        "answer": "First, the key to inspiring others it to first understand what their goals and objectives are. Once you understand what people want, you can inspire them with a vision that aligns to what they care about. People generally care about having purpose, being successful (and being recognized for it), contributing in a meaningful way, and financial rewards (to a degree) and much more. Then once you understand what people set as goals, you can inspire them through 1:1 pep talks, a presentation to multiple people and so forth."
      },
      {
        "question": "<strong>What are your presentation skills like?</strong>",
        "answer": "Make sure you share a story that demonstrates your presentation skills in front of many people. If you are really brave, offer to give a snippet of that presentation to the interviewer. This will definitely be different from what most people do."
      },
      {
        "question": "<strong>How articulate are you in expressing your ideas?</strong>",
        "answer": "One of the best ways to answer this question is clearly articulate three points that demonstrate how articulate you are (and in a sense show that in a live setting) - for example: \"I would say I'm articulate because one, I typically gather my thoughts before speaking, two, I organize my thoughts well, and three I'm concise when making a point."
      },
      {
        "question": "<strong>Would you describe yourself as more analytical or interpersonal?</strong>",
        "answer": "If you answer either, just make sure you explain why. For example, \"I would consider myself to be more analytical because I'm good at examining a data set and then understanding how to interpret it in a business environment.\" or \"I'm more of interpersonal person because I enjoy working and collaborating with my teammates and clients\""
      },
      {
        "question": "<strong>What qualities do you believe are important to have as a manager?</strong>",
        "answer": "Great managers tend to empower their employees to be successful through strong coaching. They understand how to manage relationships - this is commonly referred to emotional intelligence. They have to be able to handle both client and staff situations that require them to be calm under pressure to clearly think of solutions to complex problems. Most importantly they must be able to articulate the vision to the team and inspire them to work together to collectively achieve that goal"
      },
      {
        "question": "<strong>Have you ever been fired and if yes, why?</strong>",
        "answer": "Answer this as positively as possible and try to avoid disparaging the company you had previously worked for. The key is to accept the fact that yes, you were fired, but you've learned from the mistakes that got you there and you're better now because of it. If you haven't been fired, well, then this question's a piece of cake isn't it?"
      },
      {
        "question": "<strong>How important is a positive attitude to you?</strong>",
        "answer": "Incredibly important. I believe a positive attitude is the foundation of being successful - it's contagious in the workplace, with our customers, and ultimately it's the difference maker."
      },
      {
        "question": "<strong>How would you define success?</strong>",
        "answer": "Success is defined differently for everybody. Just make sure the parameters are defined by you with regards to work life balance, financial gain, career growth, achievements, creating meaningful work / products and so forth. If you can clearly articulate what it means to you that is a strong answer."
      },
      {
        "question": "<strong>How do you act when you encounter competition?</strong>",
        "answer": "This question is designed to see if you can rise the occasion. You want to discuss how you are the type to battle competition strongly and then you need to cite an example if possible of your past work experience where you were able to do so."
      },
      {
        "question": "<strong>Give me an example of when you competed hard and won.</strong>",
        "answer": "You can reference many different areas here when discussing a story of where you won in competition: Work experience (ideal), sports, clubs, classes, projects."
      },
      {
        "question": "<strong>What would you like to have accomplished by the end of your career?</strong>",
        "answer": "Think of 3 major achievements that you'd like to accomplish in your job when all is said and done - and think BIG. You want to show you expect to be a major contributor at the company. It could be creating a revolutionary new product, it could be implementing a new effective way of marketing, etc."
      },
      {
        "question": "<strong>What's the most rewarding work you've ever done and why?</strong>",
        "answer": "Companies love it when you discuss how you've made an impact on your teammates, clients, or partners in the business or in school. It should be rewarding because of the hard work and creative process that you've put into it."
      },
      {
        "question": "<strong>What's the least rewarding work you've ever done and why?</strong>",
        "answer": "Describe work you've done that you feel doesn't take advantage of your full potential. For example, \"I once had to make paper copies for my job and I feel it didn't take full advantage of my skills. However, it did teach me to be humble in my work and to appreciate a good opportunity when it arose to use my skills\""
      },
      {
        "question": "<strong>How good are you at problem solving?</strong>",
        "answer": "Describe the problem first and then discuss how you were able to fix it."
      },
      {
        "question": "<strong>Describe to me a time where you had to make a hard decision.</strong>",
        "answer": "Hard decisions are hard for a reason. It could dramatically effect the company. It could affect other workers. So if you have a story about how you made a hard decision and had a good outcome, share that. If you have one where the outcome wasn't great, explain how you would have changed the way you approached the decision to show you learned how to improve."
      },
      {
        "question": "<strong>How well do you multi-task?</strong>",
        "answer": "Multi-tasking is an important part of most jobs. You want to show that you're good at it but not overwhelmed with it. So discuss just a few things you can multi-task well on - for example: \"I'm good at multi tasking between work email and working on projects and the reason it because I'm good at prioritizing my work emails."
      },
      {
        "question": "<strong>How do you adapt to new working environments?</strong>",
        "answer": "It's important that you demonstrate that you can adapt to changing environments quickly. You want to stress that you can manage change. The one thing in life that is constant after all, is change."
      },
      {
        "question": "<strong>How open are you to relocation?</strong>",
        "answer": "If you're not, then say you're not. Don't lie about it just to get the job. There's no point if you won't move for the job anyway and lying is unethical. If you are open to relocation, let them know which areas you'd be willing to relocate to."
      },
      {
        "question": "<strong>What's the difference between good and exceptionally great?</strong>",
        "answer": "Being good is getting the job done as promised. Being great is delivering the work in an exceptional way that completely exceeds expectations."
      },
      {
        "question": "<strong>What general trends do you see in our industry?</strong>",
        "answer": "Examine what's happened in the industry in the last 5 - 10 years and how it's evolved and then look at what both the company and analysts are saying about the future of that industry in which that company competes in. Read trade magazines / online sources in that industry as well to make sure you stay up to date on trends."
      },
      {
        "question": "<strong>What other jobs are you applying for?</strong>",
        "answer": "If you're applying with other similar companies in a similar or the same industry, it's actually okay to state that as it shows you're valued and wanted."
      },
      {
        "question": "<strong>Give me a few examples of how you're results oriented.</strong>",
        "answer": "Make you give an example where you discuss details and metrics. For example, I was a tutor in my last job and mentored 5 students on their SAT test taking skills and raised their scores by 15% on average after a 3 month teaching stint."
      },
      {
        "question": "<strong>How do you prioritize your work initiatives?</strong>",
        "answer": "Discuss how you prioritize your work initiatives based on the company initiatives. For example, if you're in customer service discuss how you're focused on providing the best customer experience."
      },
      {
        "question": "<strong>Why should we give you this job when someone else is equally qualified?</strong>",
        "answer": "Describe how you're unique, but make sure you tie it to the job responsibilities and how you would impact the company. For example, \"I believe my unique programming skills and experience in developing over 18 best selling iphone apps will help the company develop high quality applications faster than my competitors\""
      },
      {
        "question": "<strong>What does your professional network look like?</strong>",
        "answer": "If you have a professional network, discuss it detail (# of contacts, people you know, their positions and what you've learned from them or how you've worked with them). If you don't have one, discuss how you would develop one (career fairs, networking events for that industry, through your existing friends, etc)"
      },
      {
        "question": "<strong>If I talked to your three biggest fans, who would they be and why?</strong>",
        "answer": "If you can reference three professionals with executive titles (CXO, VP, Director, Manager), that carries a lot of weight. Make sure you highlight how you've helped them achieve their biggest objectives and how that's made them your fan."
      },
      {
        "question": "<strong>What are your thoughts about working from home?</strong>",
        "answer": "This is a new policy some companies are adopting. If the company you are interviewing for allows for it, then you should be thankful for the flexibility and convenience yet state that working from home is a privilege that you would honor. The key point you want to make is that you would still be able to focus and be just as productive working at home."
      },
      {
        "question": "<strong>What are the goals you've set for yourself?</strong>",
        "answer": "You could discuss your goals with regards to these categories: Career goals, impact you want to leave on society, financial goals, academic goals, charitable goals."
      },
      {
        "question": "<strong>What have you done to improve yourself in the last year?</strong>",
        "answer": "Discuss how you've improved yourself through work experiences, books you've read, classes, club(s) / extracurricular activities and describe the process on how it's happened. For example: I've improved my presentation skills tremendously because I've had to do 2 presentations this year for my communications class."
      },
      {
        "question": "<strong>What do you expect to be earning in 5 years?</strong>",
        "answer": "Discuss how you expect yourself to be excellent at your job. Thus, it would be reasonable to expect pay that is based on the merit of your work."
      },
      {
        "question": "<strong>What would you do if our competitor offered you a position?</strong>",
        "answer": "I would weigh the offer and consider it, however, this company and this role is my first choice."
      },
      {
        "question": "<strong>How do you feel about taking on repetitive tasks?</strong>",
        "answer": "This answer depends on whether or not the job has a lot of repetitive tasks with no variation. If it does, then you would need to be okay with the idea of doing the same task over and over again. If you feel you can offer more than repetitive work, then describe how you would be able to do so."
      },
      {
        "question": "<strong>Describe a time when you've been overwhelmed with work.</strong>",
        "answer": "Show how you were able to over the \"overwhelmed\" feeling - by delegating tasks, getting people on your team to help you out, or by prioritizing your work and focusing on the most important issues first."
      },
      {
        "question": "<strong>Describe what a \"lot of work\" looks like to you.</strong>",
        "answer": "Ideally you'd like to state that you can take on a lot of work - this shows your work ethic, but at the same time it's okay to tell them that you value work and life balance."
      },
      {
        "question": "<strong>Give me an example of how you handled pressure at work.</strong>",
        "answer": "The company is looking to see if you can handle pressure well. Share with them an example where you were able to stay calm during a pressure filled situation (perhaps it was a deadline, or there was an emergency with a customer occurring). Discuss the situation, your reaction and steps you took to resolve it and the outcome."
      },
      {
        "question": "<strong>What are your strengths?</strong>",
        "answer": "Common strengths you can bring up include: Strong work ethic, attention to detail, strong interpersonal skills, sharp analytical skills, quick thinker, ability to lead, organized, creative, results oriented, team oriented."
      },
      {
        "question": "<strong>What are your weaknesses?</strong>",
        "answer": "Everyone has a weakness, the key is to be forthright in saying what it is and then discussing how you've fixed the weakness since then. For example: \"I'm not traditionally great at teamwork, but recently I've taken on more projects that require peer interaction and I've drastically improved my ability to work with others.\""
      },
      {
        "question": "<strong>What attracted you to this company?</strong>",
        "answer": "You could discuss the company's vision, culture and solutions/services as reasons for wanting to join it."
      },
      {
        "question": "<strong>When were you most satisfied in your job?</strong>",
        "answer": "If you want to show your ambition, you can discuss how you haven't reached all of your goals yet and in that sense aren't satisfied. However, if you want to discuss satisfaction from your job discuss an experience in which you achieved something."
      },
      {
        "question": "<strong>What were the responsibilities of your last position?</strong>",
        "answer": "Describe your responsibilities but discuss the results/metrics that show how you made an impact on the company in that role. This way it shows you hold yourself accountable."
      },
      {
        "question": "<strong>Do you have any questions for me?</strong>",
        "answer": "Yes, I do. (Proceed to ask questions regarding career growth, mentorship, a day in the life of the role, pros and cons of working at the company, how the company will stay innovative and ahead of competition in the next 3-5 years)."
      },
      {
        "question": "<strong>What do you look for in terms of culture -- structured or entrepreneurial?</strong>",
        "answer": "A good answer is to discuss the importance of having both elements in a company. Structure is good to maintain a focus on priorities and making sure people are productive but having an entrepreneurial spirit can help cultivate new ideas that can truly help the company."
      },
      {
        "question": "<strong>What techniques and tools do you use to keep yourself organized?</strong>",
        "answer": "Good answers: Utilizing a calendar, having a notebook with your \"to do\" list, focusing on your top 3 priorities each and every day, utilizing a systematic way of storing documents on your computer (like box.net)"
      },
      {
        "question": "<strong>If you had to choose one, would you consider yourself a big-picture person or a detail-oriented person?</strong>",
        "answer": "Both are important. You need to stress that. However, if you could only choose one, ask yourself - do you like to be \"in the weeds\" with your work, or do you want to be the one painting the vision?"
      },
      {
        "question": "<strong>Who was your favorite manager and why?</strong>",
        "answer": "Describe the attributes you liked about your favorite manager, typically attributes discussed are: Great at coaching, inspiring, motivating, empowering, trusting, delegating, leading, etc."
      },
      {
        "question": "<strong>What do you think of your previous boss?</strong>",
        "answer": "Do not belittle or talk badly of your last boss - it will come off as being petty. Instead, talk about the positive lessons you were able to learn from your last boss."
      },
      {
        "question": "<strong>Was there a person in your career who really made a difference?</strong>",
        "answer": "If you can't think of one, you need to get a mentor QUICKLY! Mentors can come in the form of peers, family members, co-workers, management / leaders at a company and so on."
      },
      {
        "question": "<strong>What are you most proud of?</strong>",
        "answer": "You should be proud of all your achievements! We just don't have time to hear them all as interviewers most likely. Focus on 1 really good achievement that showcases characteristics like the following: Integrity, competitiveness, resourcefulness, intelligence, persistence, and so forth."
      },
      {
        "question": "<strong>What do you like to do?</strong>",
        "answer": "Discuss your passions. Ideally if it's work related that's fantastic! If not, talk about your academic / extracurricular passions and WHY you enjoy them. For example: I love playing sports because of the team work aspect - it's fun winning together! (This example shows you're a team player)"
      },
      {
        "question": "<strong>What do you ultimately want to become?</strong>",
        "answer": "Do you want to be an entry level worker? Do you want to be a leader? Do you want to be an entrepreneur? Do you want to be a philanthropist? Do you want to be in middle management? Ask yourself these questions to figure it out."
      },
      {
        "question": "<strong>What is your personal mission statement?</strong>",
        "answer": "Is it to conquer the world? Is it to become a CEO? Is it to give back to the community? Is it to inspire others? Define your statement by stating a clear vision of how you want to make an impact on the world with your work."
      },
      {
        "question": "<strong>What are three positive things your last boss would say about you?</strong>",
        "answer": "Hopefully they would have hundreds of positive things to say about you! Just pick the top three. Then explain why!"
      },
      {
        "question": "<strong>What negative thing would your last boss say about you?</strong>",
        "answer": "\"He/She wouldn't say anything bad, but he/she may point out I could improve in a certain area, and I've taken steps to become better at those skills\""
      },
      {
        "question": "<strong>What three character traits would your friends use to describe you?</strong>",
        "answer": "Friends would typically use attributes like (assuming you have these): Trustworthy, honest, hardworking, friendly, courageous, nice, diligent, organized and so forth. Not saying you have all of these, but the best way for you to find out is to survey your friends by asking them what they consider your brand to be."
      },
      {
        "question": "<strong>What are three positive character traits you don't have?</strong>",
        "answer": "List three attributes that you aspire to attain / build in the next few years - and then explain how you would develop those."
      },
      {
        "question": "<strong>If you were interviewing someone for this position, what traits would you look for?</strong>",
        "answer": "This is where the interviewer tries to turn the tables on you. Answer confidently by stating 3 specific traits that are applicable to that job role. For example, a consulting job would likely look for someone who can think outside of the box.&nbsp;<br><br>After answering, ask them, \"Am I spot on here and if not, what traits would you look for?\""
      },
      {
        "question": "<strong>What is your greatest fear?</strong>",
        "answer": "We all have fears. It's okay to discuss them. Just don't dive too deeply into them. Discuss how you would work to overcome your fears. You don't want to seem weak. You want to acknowledge it's out there but that you'll be able to work through it."
      },
      {
        "question": "<strong>What is your greatest achievement outside of work?</strong>",
        "answer": "This is a great opportunity for you to discuss how you've given back to the community, how you've achieved in a competitive extracurricular activity (think sports or clubs), how you've mentored others, and so forth."
      },
      {
        "question": "<strong>What are the qualities of a good leader? A bad leader?</strong>",
        "answer": "A good leader provides constructive criticism, motivates and inspires, coaches the mentee to be successful with their set of skills, and encourages them to push themselves. A bad leader only cares about his/her own interests and does not look out for the success of his/her staff."
      },
      {
        "question": "<strong>Do you think a leader should be feared or liked?</strong>",
        "answer": "Liked. You want to work harder for people that inspire and motivate you. Fear only lasts for so long."
      },
      {
        "question": "<strong>How do you feel about taking no for an answer?</strong>",
        "answer": "It's good to be persistent, but not overbearing. Everyone will face rejection at some point in their life, so at some point you'll have to take no for an answer but then learn why you were turned down."
      },
      {
        "question": "<strong>How would you feel about working for someone who knows less than you?</strong>",
        "answer": "The reality is, the majority of the time someone is in a management/leadership position is because of their experience and past success. So they probably possess at least a unique set of knowledge from you. So you'll want to learn from them as much as possible. If it's not the case, then discuss how you would look for mentors in different departments to help your personal career development."
      },
      {
        "question": "<strong>How do you think I rate as an interviewer?</strong>",
        "answer": "Don't insult them. If they're asking you good questions, they're a good interviewer - let them know that. If they're asking you bad / ridiculous questions that don't relate to the job role or you then suggest a few areas of improvement in a courteous way."
      },
      {
        "question": "<strong>Tell me one thing about yourself you wouldn't want me to know.</strong>",
        "answer": "Talk about a trait that you would consider a weakness. No need to talk about your deepest darkest secrets here."
      },
      {
        "question": "<strong>Tell me the difference between good and exceptional.</strong>",
        "answer": "Good gets the job done on time and is high quality. Exceptional is a game changer - it stands out, it's creative, it's above and beyond expectations. Tell the interviewer a story about how you were exceptional."
      },
      {
        "question": "<strong>What kind of car do you drive?</strong>",
        "answer": "The only time this might matter is if the job requires a certain type of car because of the responsibilities. For example, if you need to load a lot of construction materials into your car, you'll probably need a truck."
      },
      {
        "question": "<strong>There's no right or wrong answer, but if you could be anywhere in the world right now, where would you be?</strong>",
        "answer": "Just be honest about where you'd like to be - you never know - you may end up bonding with the interviewer with the location. However, you want to stress that you want to work out of the location that you're interviewing for."
      },
      {
        "question": "<strong>What's the last book you read?</strong>",
        "answer": "Try to talk about a book related to the industry, for example, if you're applying for a role related to business, cite a business book."
      },
      {
        "question": "<strong>What would you do if you won the lottery?</strong>",
        "answer": "The interviewer is asking this question to find out what your true passion is. Ideally it aligns to the type of work you're interviewing for. If not, tie it back in terms of how it relates to the job, for example, \"I believe I'll learn the necessary skills in this job to pursue my passion later on in life.\""
      },
      {
        "question": "<strong>Who are your heroes?</strong>",
        "answer": "Have at least one person you consider a hero or role model. Be ready to explain why they are a hero to you and how they've inspired you to be a better person."
      },
      {
        "question": "<strong>What do you like to do for fun?</strong>",
        "answer": "Be open to sharing hobbies and activities that you enjoy. Make sure you're genuine about it and don't list off things you don't really like because if they ask you a follow up question it'll be harder for you to answer."
      },
      {
        "question": "<strong>What do you do in your spare time?</strong>",
        "answer": "If you want to show your fun side, discuss your extracurricular activities. If you want to show your ambition, discuss the work / school projects you do in your spare time."
      },
      {
        "question": "<strong>What's your salary history?</strong>",
        "answer": "Be prepared to share your salary history and also the documentation to back it up. This is a common request from companies, especially if you're trying to negotiate a higher salary than what they're offering."
      },
      {
        "question": "<strong>If I were to give you this salary you requested but let you write your job description for the next year, what would it say?</strong>",
        "answer": "It should say the same thing - after all - if you think this salary is fair then it should suit the responsibilities!"
      },
      {
        "question": "<strong>How would you go about establishing your credibility quickly with the team?</strong>",
        "answer": "Fully understand my responsibilities, work hard and exceed expectations, learn as much as possible, help others as much as possible, understand what my teammates' goals and needs are, be on time, and gain a mentor."
      },
      {
        "question": "<strong>How long will it take for you to make a significant contribution?</strong>",
        "answer": "First define significant contribution - once you do that - lay out a timeline plan in which you think you can achieve that."
      },
      {
        "question": "<strong>What do you see yourself doing within the first 30 days of this job?</strong>",
        "answer": "Typically the first 30 days are designed for you to learn as much as possible. Work hard to get to know your teammates, how they work together, and how you can make the biggest impact."
      },
      {
        "question": "<strong>If selected for this position, can you describe your strategy for the first 90 days?</strong>",
        "answer": "This depends on the job role. Make sure you break it down into"
      },
      {
        "question": "<strong>How did you find out about this job? b) What do you know about the job?</strong>",
        "answer": "Possible ways to find out about the job: Online website listing, friend, professional referral, mentor, career fairs, networking events. You should know about the roles and responsibilities of the job and what they're looking for. Make sure you read up on that online beforehand or ask the person that referred you."
      },
      {
        "question": "<strong>What do you know about this department?</strong>",
        "answer": "One good way to find out about the department is to try to \"informally\" interview the existing employees over coffee (outside of the office) if possible. It's hard if you don't have any connections there, but if you do a great way to learn about it. Other than that, it's often hard to learn about the department so you can turn the table back on them by asking questions to learn about it."
      },
      {
        "question": "<strong>Why did you choose your major in college or tech school?</strong>",
        "answer": "People usually choose their major based on their passions or the career path they want to head towards."
      },
      {
        "question": "<strong>Does your boss know you're here today?</strong>",
        "answer": "Usually, you probably haven't told your boss for obvious reasons. So it's ok to say that they do not. You don’t want to upset the balance at your current job after all and nothing is guaranteed in an interview. The interviewer should understand this stance."
      },
      {
        "question": "<strong>Are you a Type A, B or C personality?</strong>",
        "answer": "Ask them to define the different categories."
      },
      {
        "question": "<strong>How do you take \"No\" for an answer?</strong>",
        "answer": "You want to be persistent enough to understand why someone is saying no so that you could potentially convince them otherwise with a sound reason. However, if they are still saying \"no\" to you, then you need to humbly accept their position and move on."
      },
      {
        "question": "<strong>What is the difference between a big ego and a healthy ego?</strong>",
        "answer": "\"Ego\" should be replaced by confidence. It's good to be confident as it shows that you know what you're doing. However, a big ego is when confidence spirals out of control and you become arrogant."
      },
      {
        "question": "<strong>Describe a time when you had to help a coworker out that did not directly benefit you?</strong>",
        "answer": "There should be many times where you've assisted others. If you haven't, think of how you would in the future. You can discuss charitable causes, how you mentored someone, and so on."
      },
      {
        "question": "<strong>Do you have good manners? What types of people need to be treated with good manners?</strong>",
        "answer": "You should have good manners. Everyone should be treated with courtesy and respect."
      },
      {
        "question": "<strong>How do you continue learning on a daily basis? Why is continuous improvement necessary?</strong>",
        "answer": "You can learn on the job, through books and magazines, through social networks, blogs, seminars, mentors and so on. Continuous improvement is important because the one thing in life that is constant is change. And you have to continue to push yourself day in and day out to be the best."
      },
      {
        "question": "<strong>What <em>is thinking outside the box</em>&nbsp;to you?</strong>",
        "answer": "It means not doing things exactly the same way as everyone else. You've got to challenge the status quo and bring something new to the business."
      },
      {
        "question": "<strong>How do you rate yourself in computer skills? Please describe the programs and software that you can use well.</strong>",
        "answer": "Ideally you want to able to type quickly, have the ability to effectively use Microsoft Office, and more importantly be able to quickly adapt to computer / technology skills. More and more it's become an integral part of work. If the job doesn't require technology skills - then this question shouldn't be asked!"
      },
      {
        "question": "<strong>Can you perform Internet research? Please describe to me your steps in doing so.</strong>",
        "answer": "Internet research can entail Google searches, industry sites, news articles, social networks and company websites."
      },
      {
        "question": "<strong>Do you work better on a team, with just one partner, or alone?</strong>",
        "answer": "Ideally you can handle all three well, but you may have a personal preference for one or a few. The key is to make sure you understand what the job is looking for and to pair your answer with that (assuming it's true)"
      },
      {
        "question": "<strong>How does your present position differ from past ones?</strong>",
        "answer": "Describe the difference with regards to responsibilities, culture, team, career opportunity, and the work itself."
      },
      {
        "question": "<strong>What would you like to avoid completely in your next job?</strong>",
        "answer": "Bad business ethics, teammates / managers that are disrespectful / inconsiderate. But of course, this job wouldn't have things like this right?"
      },
      {
        "question": "<strong>What have you done to prepare yourself to be a supervisor?</strong>",
        "answer": "1. Learn from current supervisors (best practices)<br>2. Mentor others<br>3. Be exceptionally good at your current job so that it builds your credibility<br>4. Have a high emotional IQ"
      },
      {
        "question": "<strong>How do you motivate employees?</strong>",
        "answer": "1. Understand their goals<br>2. Understand what they're good / not good at<br>3. Align their personal goals to the company goals and then utilize their strengths to achieve it<br>4. Inspire them through coaching and pep talks"
      },
      {
        "question": "<strong>What aspect of supervision do you find the most difficult?</strong>",
        "answer": "Managing different personalities and keeping them focused on the goal at hand."
      },
      {
        "question": "<strong>What is the most important quality a supervisor should have?</strong>",
        "answer": "The ability to inspire / lead a team towards one common vision."
      },
      {
        "question": "<strong>How do you decide what to delegate and to whom?</strong>",
        "answer": "Identify the strengths of your team members and their availability based on the priorities they have on their plate. From there, invest the tasks upon each member based on where you think you'll get the best return."
      },
      {
        "question": "<strong>Tell me about a time when you were held accountable for a problem that you hadn't caused.</strong>",
        "answer": "If someone puts the blame on you (incorrectly), the best thing you can do is NOT to retaliate. You want to make it known that you were not to blame (explain all the facts) and then focus on fixing the problem in the best way possible."
      },
      {
        "question": "<strong>Think about the changes you have seen and tell me how you handle change.</strong>",
        "answer": "You can cite personal life changes, work place changes, career changes, technology change, industry change. The key is to discuss how seeing or experiencing that change has helped your development. For example, the recent changes in social media has broadened my horizons and helped me learn new forms of efficient marketing."
      },
      {
        "question": "<strong>Tell me about a decision you made recently and how you reached it.</strong>",
        "answer": "The key is to show that you put a lot of thought (weighing out the pros and cons) but were able to be decisive. Be sure to explain your logic in arriving at the decision."
      },
      {
        "question": "<strong>Why did you leave your past jobs?</strong>",
        "answer": "Don’t talk badly about your last job or the people you worked for - that will look petty. Focus on the potential and quality of the job you're now applying for."
      },
      {
        "question": "<strong>How did you become interested in this field/industry?</strong>",
        "answer": "Describe how you've come to develop a passion or interest in this industry and use variables like \"culture, people, vision, career development, and the work itself\" to define your choice"
      },
      {
        "question": "<strong>Why did you select the University _______?</strong>",
        "answer": "Discuss the academic program, the extracurricular program(s), the school spirit, the quality of your peers, and the professors."
      },
      {
        "question": "<strong>If you could do it all over again, how would you plan your academic studies differently?</strong>",
        "answer": "Whatever you do, just don't act bitter. A lot of times we wish we could change the past, but focus on the positive reasons and results of the decisions you already made."
      },
      {
        "question": "<strong>How much time do you need to join the organization?</strong>",
        "answer": "You should be able to join it right away, barring plans you've already made (family travel, vacation, other obligations). The key is to simply be open in communication of what's already committed on your schedule. Most companies are accommodating. If they are not, weight the importance of joining that company vs. your plans."
      },
      {
        "question": "<strong>Are you aggressive?</strong>",
        "answer": "If you are, describe it through a story / experience that you had. If you aren't, then explain why you're not. If the job role asks for you to be aggressive/not aggressive and you're the opposite of it, explain how you would develop that characteristic."
      },
      {
        "question": "<strong>What makes you a good manager?</strong>",
        "answer": "Describe how you manage people, time, money and energy in the most effective manner to achieve the best return of that investment."
      },
      {
        "question": "<strong>What motivates you the most?</strong>",
        "answer": "Is it money? Is it career development? Is it recognition? Is it a sense of achievement? Is it to impress your peers? Is it for fame?"
      },
      {
        "question": "<strong>In what areas do you think you will need guidance?</strong>",
        "answer": "Think about what you need to learn going into the job. Skill sets, industry knowledge, relationship building, team dynamics. Which areas are ones you're lacking?"
      },
      {
        "question": "<strong>How will you approach learning this \"new\" job?</strong>",
        "answer": "Interview peers and leaders/managers, read industry news, practice the skill sets needed, absorb information on the job as much as possible."
      },
      {
        "question": "<strong>Describe some problems you encountered in your most recent position and how you resolved them.</strong>",
        "answer": "Discuss your work experiences. The key is to show you're calm under pressure and can handle sensitive situations with a clear train of thought."
      },
      {
        "question": "<strong>What specific steps do you utilize in solving workplace problems?</strong>",
        "answer": "Analyze the problem. Discuss possible remedies and resulting outcomes. Decide on the remedy and track results. Re-visit problem if it's not resolved."
      },
      {
        "question": "<strong>What are some of the things that you and your supervisor disagree upon and how do you resolve them? What do you do when you are pressed for a decision?</strong>",
        "answer": "The key is that you openly communicate your thoughts to your supervisor to explain your position and try to come to a mutual decision together. Also be sure to listen to his/her thoughts so that you can potentially compromise. When you're pressed for a decision, make sure you've put thought into the reasons as to how you arrived at it and then decisively make it."
      },
      {
        "question": "<strong>In your last job what kinds of pressure did you encounter and how did you react?</strong>",
        "answer": "Do not show your fear or uneasiness in handling pressure. Everyone likes to have a worker who can handle pressure calmly and with a clear train of thought. Show how you would logically come to a conclusion in a pressure filled situation."
      },
      {
        "question": "<strong>What kind of work interests you the most?</strong>",
        "answer": "What you're passionate about. What motivates you. What excites you."
      },
      {
        "question": "<strong>What kind of work interests you the least?</strong>",
        "answer": "What bores you. What fails to challenge you. What fails to excite you."
      },
      {
        "question": "<strong>How would your references describe you?</strong>",
        "answer": "Think of three major characteristics that demonstrate your best qualities related to work and then have quick stories to describe why."
      },
      {
        "question": "<strong>Name five characteristics that describe you.</strong>",
        "answer": "Here are a few you could choose from: Hard working, strong willed, persistent, intelligent, adept, amicable, friendly, collaborative, eager, humble."
      },
      {
        "question": "<strong>Are you willing to work in shifts?</strong>",
        "answer": "If the job calls for shifts that vary, be ready to do that for your work. If you aren't open to that, then explain why and see if they can adjust it for you."
      },
      {
        "question": "<strong>How do you define arrogance? Are you arrogant?</strong>",
        "answer": "Arrogance is having an attitude of superiority beyond reason. Confidence is believing in yourself without being cocky. You should not be arrogant."
      },
      {
        "question": "<strong>What role are you ready to take in a group?</strong>",
        "answer": "Ideally, you want to take on the role you're interviewing for, but you want to be flexible with your responsibilities if there are any changes."
      },
      {
        "question": "<strong>Who has been an inspiration for you?</strong>",
        "answer": "Cite your role models (possible examples could be your parents, people successful in the industry, world leaders, etc)"
      },
      {
        "question": "<strong>What is more important to you money or success?</strong>",
        "answer": "First ask yourself that question before the interview - what are your priorities? Are money and success actual one in the same goal for you? If not, what's more important based on how do you define success?"
      },
      {
        "question": "<strong>Rate yourself on a scale of 10.</strong>",
        "answer": "If you truly believe you're a 10, you better be able to explain why with examples / stories. If you believe you're a great contributor and have room to grow, say 8 or 9. If you're below that, explain what you would do to improve yourself to get the ranking you believe you can be."
      },
      {
        "question": "<strong>How do you handle repetitive tasks?</strong>",
        "answer": "Some people enjoy it, others don't. Which are you? If you don't like it, can you at least do it well? And if you don't like it, be ready to explain why in a positive way (i.e. your potential is to do much more than simply be repetitive)"
      },
      {
        "question": "<strong>Tell me about the last time you missed a goal or deadline.</strong>",
        "answer": "Unless you're a completely perfect person, chances are you've messed up before on a goal/deadline. If so, discuss how you fell short and what you would have done in retrospect to achieve it."
      },
      {
        "question": "<strong>How do you keep others informed on work issues?</strong>",
        "answer": "Possible methods: Talking to them, emailing them, sharing best practices in meetings"
      },
      {
        "question": "<strong>When was the last time something upset you at work? What did you do?</strong>",
        "answer": "Almost everyone has an emotional moment related to work at some point - you're not alone. The key is to learn why you reacted that way and to focus not on the problem but HOW to resolve it. Another key component is to be aware of your emotional response so that you can learn to control it in the future in a calm way."
      },
      {
        "question": "<strong>How do you ensure all of your work gets accomplished in a productive manner?</strong>",
        "answer": "The key is to prioritize what's important in your work and to stay organized to accomplish the tasks. A strong work ethic also helps."
      },
      {
        "question": "<strong>What was the biggest professional risk you have taken and what was the outcome?</strong>",
        "answer": "First discuss how you weighed the pros and cons of the risk and the results you'd believe you could achieve. Then discuss the action plan you put into place for it and outline that step by step. Then discuss the outcome and if it wasn't optimal talk about what you would do differently in hindsight."
      },
      {
        "question": "<strong>Tell me about the last time you had to work with someone inside or outside of your department to accomplish a goal.</strong>",
        "answer": "Show that you were communicative with that person and that you were able to collaborate effectively in sharing ideas and work tasks. They want to see that you can be a team player."
      },
      {
        "question": "<strong>What do you expect from this job?</strong>",
        "answer": "Talk about the potential career development, your career aspirations, your work relationships and the learning you'll receive."
      },
      {
        "question": "<strong>Do you know anyone working with this organization?</strong>",
        "answer": "It would be great if you did - then you could potentially use them as a referral if they thought highly of you."
      },
      {
        "question": "<strong>What do you like best about what you have learned about this job?</strong>",
        "answer": "Just be forth right here. Talk about what gets you excited and motivated."
      },
      {
        "question": "<strong>What concerns do you have about this job?</strong>",
        "answer": "List out all your concerns - because you want the interviewer to address them. This also shows you've thought through the potential challenges in the job and shows you're qualifying them. It puts the ball in your court."
      },
      {
        "question": "<strong>What do you see as your primary qualifications for this job?</strong>",
        "answer": "Possible qualifications: previous experience in the industry, skill set, work ethic, your business network."
      },
      {
        "question": "<strong>Are you willing to travel?</strong>",
        "answer": "If the job asks for you to travel, be prepared to do so. Unless you don't want to - in which case, why are you interviewing for this job?"
      },
      {
        "question": "<strong>Why are you leaving the organization you work for?</strong>",
        "answer": "Don't speak badly of the company - instead speak of the positive aspects of the previous work experience you had and focus on the great potential of this new job role."
      },
      {
        "question": "<strong>What happens when two priorities compete for your time?</strong>",
        "answer": "Determine the deadline for each priority. How long will it take to do each one? Which one is a bigger priority if only one can be done? Then you choose which one to work on first. You would have open communication if there is a chance one priority cannot get completed on time."
      },
      {
        "question": "<strong>Describe a situation in which you were able to use persuasion to successfully convince someone to see things your way?</strong>",
        "answer": "You want to explain what you did to persuade someone and not just highlight the fact that you persuaded someone. Explain what the situation was and why you needed to persuade the person, and how you did so. What were the results? Why did you use the technique you did?"
      },
      {
        "question": "<strong>Describe an instance when you had to think on your feet to extricate yourself from a difficult situation.</strong>",
        "answer": "Only give examples of where the end result was good, not an example of where it didn't work out or you had to lie yourself out of situation. This question will see how you act under pressure. Paint yourself in a good light when it comes to handling pressure."
      },
      {
        "question": "<strong>Give me a specific example of a time when you used good judgment and logic in solving a problem.</strong>",
        "answer": "Explain the situation, what your line of thinking was, how you arrived at your solution, and what the end result was. How did others react to your solution (manager, co-workers)?"
      },
      {
        "question": "<strong>By providing examples, convince me that you can adapt to a wide variety of people, situations and environments.</strong>",
        "answer": "Talk about situations where you've interacted with people of different cultures and ages, as well as situations where you were out of your normal environment. Only talk about situations you handled well, and give learning experiences if you learned from the situation."
      },
      {
        "question": "<strong>Describe a time when you were faced with problems or stresses that tested your coping skills.</strong>",
        "answer": "Give an example of a situation where you correctly used your coping skills. Explain the situation, what you did to cope, what the result was, and how others reacted to the result."
      },
      {
        "question": "<strong>Give an example of a time in which you had to be relatively quick in coming to a decision.</strong>",
        "answer": "This question is designed to see how you act under pressure. Give an example of a time when you had only a short time to come to a decision, what happened, what did you do, and what was the result?"
      },
      {
        "question": "<strong>Describe a time when you had to use your written communication skills to get an important point across.</strong>",
        "answer": "This is a good time to explain how well you use email, or how you create charts or diagrams. If you've ever created a training manual or procedures manual, talk about that. The interviewer wants to know that you are a good writer."
      },
      {
        "question": "<strong>Give me a specific occasion in which you conformed to a policy with which you did not agree.</strong>",
        "answer": "When giving an example of a policy, be careful not to mention a policy that the new company would also have. Explain why you didn't agree with the policy (actual reasoning), and why you conformed. Did you tell anyone that you didn't agree, or did you simply conform from the beginning?"
      },
      {
        "question": "<strong>Give me an example of an important goal which you had set in the past and tell me about your success in reaching it.</strong>",
        "answer": "Many people want to mention their college education as the goal, but unless you achieved it through a different path than most people you should try to come up with a different example."
      },
      {
        "question": "<strong>Describe the most significant or creative presentation that you have had to complete.</strong>",
        "answer": "What was the presentation about, how did you prepare, who did you give the presentation to, and how do you believe the presentation went?"
      },
      {
        "question": "<strong>Tell me about a time when you had to go above and beyond the call of duty in order to get a job done.</strong>",
        "answer": "Explain the situation, and what you did to go above and beyond? How did others react?"
      },
      {
        "question": "<strong>Give me an example of a time when you were able to successfully communicate with another person even when that individual may not have personally liked you (or vice versa).</strong>",
        "answer": "This question is designed to see how you handle conflict and to see whether you can move beyond it. It is better to give an example of a situation where someone else didn't like you, rather than where you didn't like someone else."
      },
      {
        "question": "<strong>Sometimes it's easy to get in \"over your head.\" Describe a situation where you had to request help or assistance on a project or assignment.</strong>",
        "answer": "Requesting help isn't a bad thing, it shows that you put the company first instead of yourself. Give an example of a time when so many projects landed on your plate and you had to ask for help, who you asked, and how you decided what you would do and what the other person would do."
      },
      {
        "question": "<strong>Give an example of how you applied knowledge from previous coursework to a project in another class.</strong>",
        "answer": "Many classes require knowledge from previous classes, even basic skills like writing and math came from previous classes at some point. If you've ever had a research class, the skills learned in that class will transfer over to most future classes."
      },
      {
        "question": "<strong>Describe a situation where others you were working with on a project disagreed with your ideas. What did you do?</strong>",
        "answer": "This question is designed to see if you can stand by your ideas when they are good and also to see whether you can recognize when someone else's ideas are better. Give an example of each if possible."
      },
      {
        "question": "<strong>Describe a situation in which you found that your results were not up to your professor's or supervisor's expectations. What happened? What action did you take?</strong>",
        "answer": "Give a situation in which you misunderstood the expectations, not where you didn't do your best. Misunderstandings happen, and you can explain that now you always make certain you understand exactly what your boss or professor wants."
      },
      {
        "question": "<strong>Tell of a time when you worked with a colleague who was not completing his or her share of the work. Who, if anyone, did you tell or talk to about it? Did the manager take any steps to correct your colleague? Did you agree or disagree with the manager's actions?</strong>",
        "answer": "This is a trick question. The interviewer wants to see that you spoke with the colleague first about not completing his/her share, not that you went straight to the manager about it."
      },
      {
        "question": "<strong>Describe a situation in which you had to arrive at a compromise or guide others to a compromise.</strong>",
        "answer": "This question is designed to see how well you can mediate a situation and handle conflict. You want to come across as someone who can compromise when necessary."
      },
      {
        "question": "<strong>What steps do you follow to study a problem before making a decision.</strong>",
        "answer": "The interviewer wants to know that you don't just jump into a solution without knowing the problem in detail. You want to study the problem by determining the cause of the problem, what the problem is, and what the possible solutions are. You then decide on a solution."
      },
      {
        "question": "<strong>We can sometimes identify a small problem and fix it before it becomes a major problem. Give an example(s) of how you have done this.</strong>",
        "answer": "Give an example of the problem, what you believed could have potentially happened if you had not corrected the problem, and what you did to correct the problem."
      },
      {
        "question": "<strong>In a supervisory or group leader role, have you ever had to discipline or counsel an employee or group member? What was the nature of the discipline? What steps did you take? How did that make you feel? How did you prepare yourself?</strong>",
        "answer": "If you haven't been a supervisor, think of a situation in which you were a group leader for a school project. Don't give names."
      },
      {
        "question": "<strong>Recall a time from your work experience when your manager or supervisor was unavailable and a problem arose. What was the nature of the problem? How did you handle that situation? How did that make you feel?</strong>",
        "answer": "This question is designed to see if you require supervision or if you can work independently and make decisions. Give an example that shines a good light on you."
      },
      {
        "question": "<strong>Recall a time when you were assigned what you considered to be a complex project. Specifically, what steps did you take to prepare for and finish the project? Were you happy with the outcome? What one step would you have done differently if given the chance?</strong>",
        "answer": "This question is designed to see that you are good at project management, that you can set goals, and see the big picture while focuses on the smaller tasks. Give an example and go through your thinking process and how you set goals for each task, resulting in the end project."
      },
      {
        "question": "<strong>What was the most complex assignment you have had? What was your role?</strong>",
        "answer": "In this example, you want to give an example where you were either the leader or the facilitator (project manager)."
      },
      {
        "question": "<strong>How was your transition from high school to college? Did you face any particular problems?</strong>",
        "answer": "This question is a question to get a feel for who you are and to see how you dealt with a major change in life."
      },
      {
        "question": "<strong>Tell of some situations in which you have had to adjust quickly to changes over which you had no control. What was the impact of the change on you?</strong>",
        "answer": "This question is designed to see how you handle change and whether you can adapt to changing situations. Give an example of where you handled change well and explain what you did."
      },
      {
        "question": "<strong>Compare and contrast the times when you did work which was above the standard with times your work was below the standard.</strong>",
        "answer": "Focus more on your work that was above the standard. For the work below standard, explain how you learned from the experience and will no longer make the same mistakes."
      },
      {
        "question": "<strong>Describe some times when you were not very satisfied or pleased with your performance. What did you do about it?</strong>",
        "answer": "This question is designed to see whether you can accurately evaluate your own performance and learn from your mistakes. Focus on your learning experiences from bad performance."
      },
      {
        "question": "<strong>What are your standards of success in school? What have you done to meet these standards?</strong>",
        "answer": "The interviewer wants to see that you are self-driven and that you set your own high standards, not that you only achieve because you are forced to. Explain what your standards are and how you successfully meet them."
      },
      {
        "question": "<strong>How have you differed from your professors in evaluating your performance? How did you handle the situation?</strong>",
        "answer": "Don't speak badly about your professors, but rather just explain the difference in evaluation standards. Explain how you handled the situation, and how you learned from the experience."
      },
      {
        "question": "<strong>Give examples of your experiences at school or in a job that were satisfying. Give examples of your experiences that were dissatisfying.</strong>",
        "answer": "This question is designed to see what you enjoy and don't enjoy. If you really enjoyed a particular course or a particular organization you were involved in, be certain to highlight it."
      },
      {
        "question": "<strong>What kind of supervisor do you work best for? Provide examples.</strong>",
        "answer": "Don't speak badly about any of your former supervisors, instead speak to the attributes you liked best. Can you adapt if a supervisor has traits you do not like?"
      },
      {
        "question": "<strong>Describe some projects or ideas (not necessarily your own) that were implemented, or carried out successfully primarily because of your efforts.</strong>",
        "answer": "It is best to give an example of an idea you either came up with or had a major role in implementing."
      },
      {
        "question": "<strong>Describe a situation that required a number of things to be done at the same time. How did you handle it? What was the result?</strong>",
        "answer": "This question is designed to see if you have the ability to multitask. Give an example of how you've successfully juggled many things at once."
      },
      {
        "question": "<strong>Have you found any ways to make school or a job easier or more rewarding or to make yourself more effective?</strong>",
        "answer": "Efficiency is important to companies, so think of an example of how you've streamlined a process and explain what you did and what the result was."
      },
      {
        "question": "<strong>How do you determine priorities in scheduling your time? Give examples.</strong>",
        "answer": "Give an example of a situation where you had to multitask and juggle several priorities. Explain your thought process as you determined which tasks were the top priorities."
      },
      {
        "question": "<strong>Tell of a time when your active listening skills really paid off for you -- maybe a time when other people missed the key idea being expressed.</strong>",
        "answer": "This could be an example from work or from school. Explain how you actively listen and what you do to remember (e.g. taking notes)."
      },
      {
        "question": "<strong>What has been your experience in giving presentations? What has been your most successful experience in speech making?</strong>",
        "answer": "The company wants to hire someone who is comfortable with public speaking and can prepare a presentation. Give an example where you had to present in front of several people, and what you did to prepare."
      },
      {
        "question": "<strong>Tell of the most difficult customer service experience that you have ever had to handle -- perhaps an angry or irate customer. Be specific and tell what you did and what the outcome was.</strong>",
        "answer": "This question is designed to see how you handle conflict and to see whether you can move beyond it. Explain what you do in such a situation and how you stayed level-headed."
      },
      {
        "question": "<strong>Give an example of when you had to work with someone who was difficult to get along with. Why was this person difficult? How did you handle that person?</strong>",
        "answer": "This question is designed to see how you handle difficult people, and what you have successfully done to work with them. Explain how you do not let difficult people get your attitude down."
      },
      {
        "question": "<strong>Describe a situation where you found yourself dealing with someone who didn't like you. How did you handle it?</strong>",
        "answer": "This question is designed to see how you handle conflict and to see whether you can move beyond it. Also, be sure that the reason for your person not liking you isn't something that will look bad the interviewer."
      },
      {
        "question": "<strong>Give me a specific example of something you did that helped build enthusiasm in others.</strong>",
        "answer": "If you're ever going to be a supervisor, the company wants to know that you can motivate employees. Give an example of what you've done to motivate others and build enthusiasm."
      },
      {
        "question": "<strong>Tell me about a difficult situation when it was desirable for you to keep a positive attitude. What did you do?</strong>",
        "answer": "This is similar to the last question except that it focuses on you instead of others. The company wants to know that you can keep a positive attitude even when times are difficult. Give an example and explain what you do to keep your spirits up."
      },
      {
        "question": "<strong>Give me an example of a time you had to make an important decision. How did you make the decision? How does it affect you today?</strong>",
        "answer": "Describing your decision-making process is more important than the decision itself. How do you decide on a solution?"
      },
      {
        "question": "<strong>Give me an example of a time you had to persuade other people to take action. Were you successful?</strong>",
        "answer": "Talk about a time when you've persuaded others to do something that was for the good of a project or the company. What did you do to persuade, and how receptive were the others to the idea?"
      },
      {
        "question": "<strong>Tell me about a time when you had to deal with a difficult person. How did you handle the situation?</strong>",
        "answer": "This question is designed to see how you handle conflict and to see whether you can move beyond it. Explain what you do in such a situation and how you stayed level-headed."
      },
      {
        "question": "<strong>Tell me about a time you had to handle multiple responsibilities. How did you organize the work you needed to do?</strong>",
        "answer": "This question is designed to see if you have the ability to multitask. Give an example of how you organized your work."
      },
      {
        "question": "<strong>Tell me about a time when you had to make a decision, but didn't have all the information you needed.</strong>",
        "answer": "This question is designed to see whether you know how to ask the right questions to get the information you need. The company doesn't want someone who makes a decision without all of the information."
      },
      {
        "question": "<strong>What suggestions do you have for our organization?</strong>",
        "answer": "You don't know enough about the organization yet to give a suggestion. You can talk about how you are excellent with efficiency (or something else that's important), and that once you start you will focus on finding ways to make changes that benefit the company."
      },
      {
        "question": "<strong>What is the most significant contribution you made to the company during a past job or internship?</strong>",
        "answer": "What was the contribution, what were the results? What did others think of your contribution?"
      },
      {
        "question": "<strong>What is the biggest mistake you've made?</strong>",
        "answer": "Focus on your learning experiences from your mistake."
      },
      {
        "question": "<strong>Describe a situation in which you had to use reference materials to write a research paper. What was the topic? What journals did you read?</strong>",
        "answer": "This question is designed to see what your research methods are. Explain how you organize your research and what types of materials you use."
      },
      {
        "question": "<strong>Give me a specific example of a time when a co-worker or classmate criticized your work in front of others. How did you respond? How has that event shaped the way you communicate with others?</strong>",
        "answer": "You want to explain how you believe constructive criticism can be helpful, but that it should be done one-on-one and not in front of others. Explain how you do things differently than the person in your example did."
      },
      {
        "question": "<strong>Give me a specific example of a time when you sold your supervisor or professor on an idea or concept. How did you proceed? What was the result?</strong>",
        "answer": "What was the idea, how did you present it to your supervisor, what were the results once the idea was implemented?"
      },
      {
        "question": "<strong>Describe the system you use for keeping track of multiple projects. How do you track your progress so that you can meet deadlines? How do you stay focused?</strong>",
        "answer": "This question is designed to see if you have the ability to multitask. Give an example of how you organized your work."
      },
      {
        "question": "<strong>Tell me about a time when you came up with an innovative solution to a challenge your company/class/organization was facing. What was the challenge? What role did others play?</strong>",
        "answer": "The company wants to hire someone who can come up with solutions to problems the company is facing, and can effectively implement those solutions. Give an example from the past that shows this."
      },
      {
        "question": "<strong>Describe a specific problem you solved for your employer or professor. How did you approach the problem? What role did others play? What was the outcome?</strong>",
        "answer": "Describe the problem, what the process was for coming up with solutions, and how you came to the best solution. What were the results?"
      },
      {
        "question": "<strong>Describe a time when you got co-workers or classmates who dislike each other to work together. How did you accomplish this? What was the outcome?</strong>",
        "answer": "This question is designed to see how well you can mediate a situation and handle conflict. You want to come across as someone who can compromise when necessary."
      },
      {
        "question": "<strong>Tell me about a time when you failed to meet a deadline. What things did you fail to do? What were the repercussions? What did you learn?</strong>",
        "answer": "This example should be a time in which a more important priority came up and you had to focus on that, instead of the other deadline you had. Don't give an example of a time when you were bad at managing your time and missed the deadline."
      },
      {
        "question": "<strong>Describe a time when you put your needs aside to help a co-worker or classmate understand a task. How did you assist him or her? What was the result?</strong>",
        "answer": "This is a question that deals with communicating ideas and how effectively you can train someone else. Describe what you do to train someone and how you break things down into a level they can understand."
      },
      {
        "question": "<strong>Give two examples of things you've done in previous jobs or school that demonstrate your willingness to work hard.</strong>",
        "answer": "It would be good to have an example from school and from work. Explain what you did and why you wanted to work hard, and how you managed your time."
      },
      {
        "question": "<strong>Describe the last time that you undertook a project that demanded a lot of initiative.</strong>",
        "answer": "Describe that you take initiative and are self-driven. You want to give an example that is recent, because it shows that you still have initiative, not that you had it 12 years ago."
      },
      {
        "question": "<strong>What is the most competitive work or school situation you have experienced? How did you handle it? What was the result?</strong>",
        "answer": "You want to come across as competitive, but not cut-throat."
      },
      {
        "question": "<strong>Describe a project or situation that best demonstrates your analytical abilities.</strong>",
        "answer": "Describe your thinking and reasoning process from the example you give. Your process is more important than the situation itself."
      },
      {
        "question": "<strong>Give an example of when you took a risk to achieve a goal. What was the outcome?</strong>",
        "answer": "Taking a risk is good, as long as it doesn't put the company at risk of lawsuits or losing a lot of money. Give an example where risk paid off."
      },
      {
        "question": "<strong>Tell about a time when you built rapport quickly with someone under difficult conditions.</strong>",
        "answer": "Describe how you are able to get along with just about anyone, even in tough situations."
      },
      {
        "question": "<strong>Some people consider themselves to be \"big picture people\" and others are detail oriented. Which are you? Give an example that illustrates your preference.</strong>",
        "answer": "It is important to show that you are both. You want to show that you are detail oriented and can get the individual tasks done while focusing on the big picture."
      },
      {
        "question": "<strong>Describe a situation where you felt you had not communicated well. How did you correct the situation?</strong>",
        "answer": "Communication is important, so focus on what you learned from the situation and how you no longer make the same mistake.",
      },
      {
        "question": "<strong>Describe a time when you took personal accountability for a conflict and initiated contact with the individual(s) involved to explain your actions.</strong>",
        "answer": "This question is designed to see how you handle conflict and to see whether you can move beyond it. The company also wants to know that you can take accountability and responsibility and not put it on someone else.",
      },
      {
        "question": "<strong>Give me an example of when you were able to meet the personal and professional (or academic) demands in your life yet still maintained a healthy balance.</strong>",
        "answer": "This question is designed to see how well you can manage your time and multiple priorities. Give examples of how you've successfully managed juggling your work and home life.",
      },
      {
        "question": "<strong>Everyone has made some poor decisions or has done something that just did not turn out right. Give an example of when this has happened to you.</strong>",
        "answer": "Focus on what you learned from your poor decision, and how you will no longer make the same mistakes.",
      },
      {
        "question": "<strong>What do you do when you are faced with an obstacle to an important project? Give an example.</strong>",
        "answer": "Give an example of an obstacle you've faced and how you've overcome it. Explain your process for overcoming it. You want to focus on learning experiences, and how you deal with difficult situations.",
      },
      {
        "question": "<strong>Tell about the most difficult or frustrating individual that you've ever had to work with, and how you managed to work with that person.</strong>",
        "answer": "This question is designed to see how you handle conflict and to see whether you can move beyond it. Explain how you were able to work with the difficult individual, and were able to mediate the situation.",
      },
      {
        "question": "<strong>Tell about a time when your trustworthiness was challenged. How did you react/respond?</strong>",
        "answer": "You want to come across as honest, but also cool under pressure. Explain what you did when your trustworthiness was challenged, and how you were able to prove yourself as honest, while keeping a calm demeanor.",
      },
      {
        "question": "<strong>Describe a situation when you were able to have a positive influence on the actions of others.</strong>",
        "answer": "This question is designed to see whether you can motivate others and help achieve a positive attitude. Explain how you motivate others and what you do to determine what motivates them.",
      },
      {
        "question": "<strong>Tell about a recent job or campus experience that you would describe as a real learning experience? What did you learn from the job or experience?</strong>",
        "answer": "Focus on what you learned and how you will take those lessons and use them in the future."
      },
      {
        "question": "<strong>Describe a team experience you found disappointing. What could you have done to prevent it?</strong>",
        "answer": "The example you give should be one in which your team did not work well together, and you will show that you've learned from it and now use open communication to make certain everyone knows his/her role on the team."
      },
      {
        "question": "<strong>Recall a situation in which communications were poor. How did you handle it?</strong>",
        "answer": "This doesn't have be an example where you were poor at communicating, but rather one where you helped resolve a poor communication situation."
      },
      {
        "question": "<strong>Describe a time when you had to make a difficult choice between your personal and professional (or academic) life.</strong>",
        "answer": "This question is designed to see whether you're willing to go the extra mile for the company. Give an example that shows your dedication, without giving too many details about your family life. Also, you don't want to come across as though you hate your family either."
      },
      {
        "question": "<strong>On occasion we are confronted by dishonesty in the workplace or in school. Tell about such an occurrence and how you handled it.</strong>",
        "answer": "Definitely don't give an example of a time when you were dishonest, because the company doesn't want to hire a liar. Give an example of a time when someone else lied and it resulted in a difficult situation at work or school. Explain how you handled the situation."
      },
      {
        "question": "<strong>What motivates you to go the extra mile on a project or job?</strong>",
        "answer": "People are motivated by different things, and this question is designed to see what motivates you. Is it recognition, is it a feeling of achievement, or something else?"
      },
      {
        "question": "<strong>How have you grown or changed over the past few years?</strong>",
        "answer": "Learning from past experience is very important to companies, so focus on what you've learned and how that has made you grow as a person. How has this made you a better employee?"
      },
      {
        "question": "<strong>What five words would you say describe you best?</strong>",
        "answer": "Choose these words carefully, and only choose five (if you don't follow instructions the company will frown on your answer). Choose words that describe attributes that you want the interviewer to know about you."
      },
      {
        "question": "<strong>If you had enough money to retire right now, would you?</strong>",
        "answer": "Answering this question with a simple yes will come across as though you are only working for money. If you would retire, what would you do with your time? Travel, volunteer? If you wouldn't retire, explain why."
      },
      {
        "question": "<strong>When have you been most satisfied in your career?</strong>",
        "answer": "This question is designed to see what makes you happy and what motivates you. Explain why the particular example made you feel satisfied."
      },
      {
        "question": "<strong>Can you work under pressure or within a tight deadline?</strong>",
        "answer": "You always want to answer with \"yes\" and give an example of a time in which you worked within a tight deadline and what you did to meet your goals on time."
      },
      {
        "question": "<strong>Do you prefer to work alone or in a group?</strong>",
        "answer": "Answer the question truthfully, as either answer is okay. However, you want the interviewer to know that you are fine with working in the other situation, and that you have done so successfully many times in the past. Preference is one thing, while ability is something else."
      },
      {
        "question": "<strong>How do you measure your own performance?</strong>",
        "answer": "You want to come across as someone who cares about his/her performance and has a way to measure it. Explain how you measure your performance and what you do to correct your performance if it needs to be corrected or adjusted."
      },
      {
        "question": "<strong>How much were you absent from your last job?</strong>",
        "answer": "Be honest because this could come out in a reference check. If you were absence more than most people, explain why. You'll want to explain that you are committed to the job and will be dependable."
      },
      {
        "question": "<strong>Have you ever been asked to leave a position?</strong>",
        "answer": "Be honest because this could come out in a reference check. Explain why you were asked to leave the job, and what you have learned from the experience."
      },
      {
        "question": "<strong>Why did you leave your last job?</strong>",
        "answer": "Don't talk bad about the company, even if you left because you hated your manager. Explain the reasons you left and why the new job would be a great fit for you."
      },
      {
        "question": "<strong>How long have you been looking for a job?</strong>",
        "answer": "Be truthful. If you've been looking for a year, it's okay to say so because it shows that you haven't given up (and the economy is tough). If you've only been looking for a short time, you can explain that as well."
      },
      {
        "question": "<strong>How did you prepare for this interview?</strong>",
        "answer": "Be certain to say that you researched the company, went to the company website, and tried to learn as much about the position as possible."
      },
      {
        "question": "<strong>What do you like about your present job?</strong>",
        "answer": "Talk about what you like in your job, and why you like it."
      },
      {
        "question": "<strong>What do you dislike about your present job?</strong>",
        "answer": "Talk about what you dislike in your job, and why you dislike it. Explain what you do when you have to do things you dislike. How do you move past your dislike and motivate yourself to work hard?"
      },
      {
        "question": "<strong>What would your co-workers say about you?</strong>",
        "answer": "Be honest because your co-workers may be called as a reference. Highlight good attributes that your co-workers would say about you."
      },
      {
        "question": "<strong>What would your supervisor say about you?</strong>",
        "answer": "Be honest because your supervisor may be called as a reference. Highlight good attributes that your supervisor would say about you. Would he/she hire you again if he/she could?"
      },
      {
        "question": "<strong>What are the most important rewards you expect in and from your career?</strong>",
        "answer": "Explain what you want to achieve and what you are expecting to get out of your career."
      },
      {
        "question": "<strong>What are you looking for in a company?</strong>",
        "answer": "You want to be honest, but focus more on things you know the company you are interviewing with has. Some examples: good company culture, open communication, and diversity."
      },
      {
        "question": "<strong>What are you looking for in a job?</strong>",
        "answer": "Be honest, as you don't want a job that you'd hate."
      },
      {
        "question": "<strong>What are your career goals?</strong>",
        "answer": "Mention your short term and long term career goals, as they are often different. What have you done so far to work toward these goals? Most important, explain how this job will fit into your plan toward your ultimate career goals."
      },
      {
        "question": "<strong>What are your long-range goals?</strong>",
        "answer": "Explain your long-range career goals, and explain how the job will help you achieve those goals."
      },
      {
        "question": "<strong>What are your short-range goals?</strong>",
        "answer": "Explain your short-range career goals, and explain how the job will help you achieve those goals."
      },
      {
        "question": "<strong>What is more important to you: the money or the work?</strong>",
        "answer": "For most people, the answer is both (or sometimes neither). Be honest about what motivates you, and give examples from the past if possible."
      },
      {
        "question": "<strong>What do you enjoy about this industry?</strong>",
        "answer": "If you've worked in the industry before, give examples of what you've liked the most. If you haven't worked in the industry, explain what you believe you would enjoy the most based on your research of the industry."
      },
      {
        "question": "<strong>What do you know about this organization?</strong>",
        "answer": "You should have done research before the interview, so explain what you know about the organization's mission, what their product or service is, what the corporate culture is like, etc. Explain why these things make you want to work for the company."
      },
      {
        "question": "<strong>Are you applying for other jobs?</strong>",
        "answer": "It is okay to say that you are applying to other opportunities, as this could give them more of a reason to move quickly if they are interested in you. It isn't a good idea to tell them which other specific companies you are applying."
      },
      {
        "question": "<strong>Do you know anyone who works for us?</strong>",
        "answer": "This is a tricky question. If you have a close relative who works there, you should be upfront because they will likely find out later. If you happen to know someone else but don't really know what type of worker they are, you may not want to mention the person as it could reflect badly on you if they aren't a great worker."
      },
      {
        "question": "<strong>Have you ever done this kind of work before?</strong>",
        "answer": "If you have done this type of work, give examples of what you've done before. If you haven't done this type of work, give reasons why you feel you are qualified. This may be education you've obtained or other experiences that make you qualified."
      },
      {
        "question": "<strong>What experience do you have in this field?</strong>",
        "answer": "Just as in the previous question, give examples of your past experience in the field. If you haven't had experience, explain why your other experiences and education make you qualified to do the job."
      },
      {
        "question": "<strong>Do you think you are qualified for this position?</strong>",
        "answer": "You should always answer yes to this question, followed with an explanation of why you are qualified. Give examples of experience, and skills that make you qualified."
      },
      {
        "question": "<strong>Explain how you would be an asset to this organization.</strong>",
        "answer": "Explain any skills that you have that would make you unique. If you don't think you have any, then explain what you can do for the organization, what your goals are for the position, and your experience and skills that make you a great fit for the organization."
      },
      {
        "question": "<strong>Why have you applied for this particular job?</strong>",
        "answer": "Explain two things: 1. Why this company appeals to you. 2. Why this job appeals to you. Why do you want to work there in that job?"
      },
      {
        "question": "<strong>This organization is very different to your current employer, how do you think you are going to fit in?</strong>",
        "answer": "Explain what makes you a great fit. If the company culture is more to your liking, or if the industry is more appealing, then explain those things. Give some examples of how you adapt to different situations."
      },
      {
        "question": "<strong>Are you willing to put the interests of the organization ahead of your own?</strong>",
        "answer": "This question is really to see if you have a different agenda. You should talk about how your interests and the organization align. What is your mission in life, how does this organization also carry out this mission, and how will you fit in and work toward the same goal?"
      },
      {
        "question": "<strong>Would you be willing to relocate if required?</strong>",
        "answer": "If you are not willing to relocate, be honest. If the job requires relocation and you are not open to it, then it isn't the job for you. If you are willing to relocate, but you have restrictions (such as you will only relocate domestically), then explain that."
      },
      {
        "question": "<strong>Are you willing to work overtime/nights/weekends?</strong>",
        "answer": "If you are willing to work these times, then say that. If you are not, explain why. This can get tricky, as you don't necessarily want to explain why if it gets too personal (talking about your family or that you go to church on certain days).",
      },
      {
        "question": "<strong>Would you be willing to work as a temporary or contract employee?</strong>",
        "answer": "You may want to ask what this means for their company. If this is an independent contractor, you would often be required to carry your own insurance, which can get expensive. Ask what time frame the temporary appointment would be for, and then answer the question honestly."
      },
      {
        "question": "<strong>How long would you expect to work for us if hired?</strong>",
        "answer": "In today's world, companies realize that people will often only work for them from 3-7 years. Explain that you see this company in your five year plan, and that staying for 10+ years would really depend on your advancement opportunities in the future, but you would have no intentions of leaving anytime soon."
      },
      {
        "question": "<strong>What is your salary expectation for this job?</strong>",
        "answer": "Do your market research prior to the interview to determine what a fair salary is for your experience and education for this position in this geographic area. Salary.com is just once place to find this information. Never say, \"I don't know\" or \"it's negotiable\" because it makes you look like you don't know your worth."
      },
      {
        "question": "<strong>If you were hiring a person for this job, what would you look for?</strong>",
        "answer": "Explain the skills you think are necessary for the position (think about what was listed in the job posting). Then explain why you fit that criteria."
      },
      {
        "question": "<strong>Why should we hire you?</strong>",
        "answer": "Explain what you will bring the position. You don't know what the other candidates are like, so don't make assumptions about them. Sell yourself and your qualities."
      },
      {
        "question": "<strong>Would you like to have your boss's job?</strong>",
        "answer": "Don't say anything negative about your boss. Explain the challenges you'd face in the job, but why you could do it. If you absolutely wouldn’t want your boss' job, then explain why."
      },
      {
        "question": "<strong>Sell me this computer you see on my desk.</strong>",
        "answer": "This is a question to see how to deal with pressure, how persuasive you are, and what your sales abilities are. Describe the features of the computer, what it can be used for, and why it is a good buy."
      },
      {
        "question": "<strong>Why should I hire you when I could fill this job within the company?</strong>",
        "answer": "Outside ideas and perspectives are often undervalued. Sometimes you need someone from the outside to bring new ideas to the company."
      },
      {
        "question": "<strong>Why weren't you working for so long?</strong>",
        "answer": "Explain why you took a break or were unemployed. Explain that you either quit your previous jobs for a good reason or were laid off due to budget cuts. What were you doing with your time? How did you continue to seek new skills and learn while you were not working?"
      },
      {
        "question": "<strong>Describe a situation where your work was criticized.</strong>",
        "answer": "Explain the situation and what the criticism was. How did you correct the problem? How did you handle the criticism?"
      },
      {
        "question": "<strong>Your resume shows that you were with your last company for a number of years with limited increase in rank or salary. What can you tell me about this?</strong>",
        "answer": "Don't say anything bad about the company. Did you like your job and you didn't want to move up? Did your company have a tight budget and rarely gave increases to anyone? Was your rank level a broad range so that you really did move within it, but on paper it isn't as noticeable?"
      },
      {
        "question": "<strong>Why did you choose (name of school)?</strong>",
        "answer": "Explain why you chose the school, and why it was a good fit for you. Give thoughtful, but true answers. Did you go to a public university because it was a better fit financially? Was the program you wanted to study really great at your particular school of choice?"
      },
      {
        "question": "<strong>Why did you want to major in (name of major)?</strong>",
        "answer": "Explain why you chose your major and what made you come to that conclusion? Did you major change like many people's do? What were your goals when you chose the major?"
      },
      {
        "question": "<strong>What course did you like to most? The least?</strong>",
        "answer": "Give a course that you liked and why you liked it. Explain a course you didn't like, but how you were able to get through it and make it interesting enough to complete."
      },
      {
        "question": "<strong>What things did you learn in school that you could use on the job?</strong>",
        "answer": "If you went to school specifically for this career, you will have learned a lot that will help you in the job. If you went to school for a different career, explain important classes that will be helpful. For example, Interpersonal Communication is a course that you can use in most jobs."
      },
      {
        "question": "<strong>Do you think your grades adequately represent your abilities?</strong>",
        "answer": "If your grades are good, you will likely say yes. If you had some lower grades in a few classes, you may want to explain why you struggled, but how you worked your hardest to do well. You still learned even if your grades didn’t reflect it."
      },
      {
        "question": "<strong>We have hired people from your school before, but they have not worked out. What makes you different?</strong>",
        "answer": "Everyone is different. We all have different experience in life and at school. We've taken different classes, and we have different abilities. I am confident in my ability to do this job."
      },
      {
        "question": "<strong>What problems did you see in your school? How would you go about changing it?</strong>",
        "answer": "Describe only problems that could actually be corrected, and explain why it is a problem and what your solution would be."
      },
      {
        "question": "<strong>Tell me about your accomplishments that show you have initiative and a willingness to work.</strong>",
        "answer": "Give an example of a time when you took initiative and did not wait for someone to ask you to do something. How did your manager/co-workers react to it?"
      },
      {
        "question": "<strong>How competitive are you?</strong>",
        "answer": "You want to show some competitive spirit because it shows drive, but you don't want to come across as arrogant. If you are going into sales, you will want to highlight your competitive spirit a bit more and explain how goals help your competitiveness."
      },
      {
        "question": "<strong>Tell me the contribution you can make to the organization.</strong>",
        "answer": "Explain your goals for the position, and why your experience and education make you a good fit for the organization."
      },
      {
        "question": "<strong>Tell me about a professional assignment you've handled.</strong>",
        "answer": "Give an example of an assignment you've done, what the assignment was, how you did it, and what the results were."
      },
      {
        "question": "<strong>Tell me about your school experiences.</strong>",
        "answer": "This isn't a time to talk about attending frat parties, but rather a time to speak about how you volunteered with the Red Cross chapter at your school, or how you often attended the theatre productions. Speak to your academic experience as well, but don't only focus on that."
      },
      {
        "question": "<strong>What was your most rewarding college experience?</strong>",
        "answer": "Think about what you're proud of about college, besides the fact that you graduated. Were you able to work and go to school at the same time? Did you get involved in a campus organization that you found rewarding? Explain what you did and why you found it rewarding, and what you've learned from the experience."
      },
      {
        "question": "<strong>Describe your most meaningful work experience.</strong>",
        "answer": "Describe a work experience that was meaningful; explain what you were doing and why it was meaningful to you. What did you learn?"
      },
      {
        "question": "<strong>How do you propose to compensate for your lack of experience?</strong>",
        "answer": "Education is often a good way to compensate for lack of experience. Also, explain how the experience that you do have is actually valuable to the position that you're interviewing for."
      },
      {
        "question": "<strong>CRITICAL THINKING QUESTIONS</strong>"
      },
      {
        "question": "<strong>I'm the owner of a tutoring center. I want you to try to sell me your brand of pencils.</strong>",
        "answer": "The interviewer is asking you to think through the sales process: 1. Ask them about their pain points / challenges / goals. 2. Listen carefully 3. Align the solution (pencils) to their goals/challenges and discuss the benefit of buying it 4. Ask them to purchase the pencils"
      },
      {
        "question": "<strong>You're an entreprenuer and opening a new bakery store. Walk me through the process from the beginning.</strong>",
        "answer": "Walk through this logically. First you need a business plan. Then you need to obtain licenses for the business and to incorporate it. Then you need to get funding for the purchase of the equipment and for the staff's pay. Then you need to put together an operations plan so that the staff can execute the tasks needed to run the business. Then you need to figure out a marketing plan to attract customers. And so forth."
      },
      {
        "question": "<strong>I have a customer list of 10,000 businesses. Describe to me how you would create 1,000 marketing impressions from that list.</strong>",
        "answer": "Think of the different marketing campaigns you could run through direct marketing (TV, radio, newspapers/magazines), digital formats, social marketing, viral marketing and so forth."
      },
      {
        "question": "<strong>We would like you to reduce our costs by $1,000,000 in our operations department. Describe to me how you would implement that project.</strong>",
        "answer": "Ask for more information on the current operations department and what their key challenges and inefficiencies are. From there, discuss how your ideas would cut down on costs."
      },
      {
        "question": "<strong>You're the CEO of our company and you can focus on three priorities for the year. What would they be and why?</strong>",
        "answer": "It depends on the goals of the company, but here are some good answers: Increasing profitability, sustainable revenue growth, lower costs, increasing innovation to differentiate the company from competition."
      },
      {
        "question": "<strong>Your company just had a security breach and 50,000 customer credit cards were stolen, how do you handle the situation?</strong>",
        "answer": "Find out what the best solution is that will protect your customers. Immediately find out who the 50,000 customers were. From there, issue a notice detailing what happened and explain what you are doing to remedy the solution (which should be implemented immediately). Offer free credit protection services to the customers."
      },
      {
        "question": "<strong>Estimate the total number of chairs in the United States.</strong>",
        "answer": "Take your time, and ask questions to narrow down the choices. Is this just households (for example)? If yes, logically think through the steps: the US population is an estimated 307 million. Assuming there are about 112 million households out there, that works out to about 3 people per household (just under). The average house probably has a dining area and an office room. Assuming there are an average of 4 chairs total amongst both rooms, you can begin to estimate the \"household\" demand for chairs by working backwards from there. 3 people x 4 chairs = 12 x 112M householders = 1,334M chairs"
      },
      {
        "question": "<strong>Estimate the market opportunity for new chair sales in the United States.</strong>",
        "answer": "Questions to ask - How often do chairs break? What is their typical life cycle? What is the average price of a new chair?"
      },
      {
        "question": "<strong>How many times do a clock's hands overlap in a day?</strong>",
        "answer": "Map out the drawing of the block on a piece of paper. You'll find the answer is 22 unless you count Midnight as a part of the day."
      },
      {
        "question": "<strong>How would you weigh a plane without scales?</strong>",
        "answer": "Before the plane is assembled, weight all of the individual parts first."
      },
      {
        "question": "<strong>Tell me 10 ways to use a pencil other than writing.</strong>",
        "answer": "This is a test on your creativity. A pencil could be used as a eating device, as a measurement tool, as a liquid stirring device, etc."
      },
      {
        "question": "<strong>Sell me this pencil.</strong>",
        "answer": "First ask them to describe what they're looking for a pencil and why they want to buy it. Then utilize reasons that match those requirements to persuade them to buy the pencil. Close the statement by asking them if they'd be willing to buy it."
      },
      {
        "question": "<strong>If you were an animal, which one would you want to be?</strong>",
        "answer": "Which animal has characteristics you'd like to replicate in the workplace?"
      },
      {
        "question": "<strong>Why is there fuzz on a tennis ball?</strong>",
        "answer": "The fuzz slows down the ball in flight, keeps it from bouncing too high, and lets the racket get a better \"grip\" on it. A perfectly smooth ball would travel so fast and bounce so high that the game would be unplayable. Also, with a smooth ball, it would be much more difficult for the player to control the direction of the shots."
      },
      {
        "question": "<strong>If you could choose one superhero power, what would it be and why?</strong>",
        "answer": "Have fun with the answer, just make sure you back up your answer with a genuine reason."
      },
      {
        "question": "<strong>If you could get rid of any one of the US states, which one would you get rid of and why?</strong>",
        "answer": "Logically decide which state you would get rid of (perhaps the lowest revenue generating state, etc) The key is to see how you arrive at your answer."
      },
      {
        "question": "<strong>With your eyes closed, tell me step-by-step how to tie my shoes.</strong>",
        "answer": "Take the time to visualize the shoe first. Then as you go through the process make sure you describe it step by step in great detail."
      },
      {
        "question": "<strong>How many gas stations are there in the US?</strong>",
        "answer": "Work backwards on this to find the answer: There are 50 states with the mean population being X million. For every X million of people there are Y number of gas stations. Thus X times Y gives you the number of gas stations in the US."
      },
      {
        "question": "<strong>How many garden hoses were sold in the US last year?</strong>",
        "answer": "Work backwards on this to find the answer: There are an estimated 150 million households in the US (making this up), from there we see an average of 2 hoses per household, and thus we arrive at 300 million hoses."
      },
      {
        "question": "<strong>How many pairs of boxes are sold in the US each year?</strong>",
        "answer": "Let's first discuss when boxes are typically used. From there, calculate the average number of boxes used for each scenario, and then multiply that by the number of people that would use it."
      },
      {
        "question": "<strong>How many NetFlix DVDs get lost in the mail each year?</strong>",
        "answer": "Make assumptions or ask questions to begin. For example, let's assume that there are 15 million customers that leverage mail in DVDs. Of those 15 million, assuming there is a 1% loss rate, than you'll have 150,000 DVDs that are lost in the mail each year."
      },
      {
        "question": "<strong>Estimate the number of gallons of gasoline the typical gas station pumps in a given weekday.</strong>",
        "answer": "Start off with assumptions - how many cars are in the world and how often do they fill up at the stations on any given day (or what's the average) From there estimate the average number of gallons each car would need and then you can arrive at your answer"
      },
      {
        "question": "<strong>QUESTIONS YOU CAN ASK</strong>"
      },
      {
        "question": "What's a typical day like for this role?"
      },
      {
        "question": "What are the pros and cons of this role?"
      },
      {
        "question": "Tell me about the good and challenging aspects of the company"
      },
      {
        "question": "What are your co-workers like?"
      },
      {
        "question": "What is work-life balance like?"
      },
      {
        "question": "How often do you have to work late nights?"
      },
      {
        "question": "How does the company reward its top employees?"
      },
      {
        "question": "What is your view of management?"
      },
      {
        "question": "What type of career growth is possible at this company?"
      },
      {
        "question": "What are the leaders of the company like?"
      },
      {
        "question": "How do the leaders take feedback from the employees?"
      },
      {
        "question": "Describe how collaborative the work environment is."
      },
      {
        "question": "Are people silo-ed into positions or is there opportunity to switch departments to broaden my skill set?"
      },
      {
        "question": "How does the company measure success?"
      },
      {
        "question": "What role does community giving play within the company?"
      },
      {
        "question": "How does the company reward success?"
      },
      {
        "question": "Is this position newly created? If not, what spurred the last employee to leave?"
      },
      {
        "question": "How would you describe the success of the department I am joining and their future prospects?"
      },
      {
        "question": "How much traveling will I have to do?"
      },
      {
        "question": "Will I have to relocate?"
      },
      {
        "question": "If I were to receive an offer, how soon would I have to start?"
      },
      {
        "question": "How will the company continue to innovate?"
      },
      {
        "question": "What are the next steps after this interview?"
      },
      {
        "question": "Based on our discussion, do you feel I am a good fit for the company?"
      },
      {
        "question": "How can I quickly become a strong contributor within this role?"
      },
      {
        "question": "What are the biggest challenges I will encounter in this role?"
      },
      {
        "question": "Is the working environment one where I will be micro managed or empowered with my own decisions?"
      },
      {
        "question": "What drives the organization?"
      },
      {
        "question": "What do senior executives value? What is important to them?"
      },
      {
        "question": "What are the core values that make up the organization's culture? Has this been consistently supported by senior executives?"
      },
      {
        "question": "Is the organization financially strong and stable? Please provide your annual financial reports for the last three years. (This is available on-line for publicly-traded companies.)"
      },
      {
        "question": "What are the significant strengths, weaknesses, opportunities, and threats facing the organization over the next few years?"
      },
      {
        "question": "What are the organization's strategic goals?"
      },
      {
        "question": "How does the department / team I will be joining relate to the overall organization? How does it support the organization's strategic goals?"
      },
      {
        "question": "Is the department a cost or profit center?"
      },
      {
        "question": "How is the department perceived politically?"
      },
      {
        "question": "How often will my immediate supervisor meet with me one on one?"
      },
      {
        "question": "What is the management style of my immediate supervisor and their superior?"
      },
      {
        "question": "How do you deal with poorly performing employees?"
      },
      {
        "question": "What is your strategy for empowering employees?"
      },
      {
        "question": "How do you ensure you are delegating effectively rather than micro-managing?"
      },
      {
        "question": "How do you help ensure that employees are highly motivated?"
      },
      {
        "question": "How do you ensure that each employee is doing quality work?"
      },
      {
        "question": "How does management ensure that employees feel listened to?"
      },
      {
        "question": "How do you enhance the creativity of developers?"
      },
      {
        "question": "How approachable and receptive is management to suggestions and feedback?"
      },
      {
        "question": "How do you minimize interruptions for developers?"
      },
      {
        "question": "Do you treat people with respect and integrity? Provide an example."
      },
      {
        "question": "How important is productivity to the organization?"
      },
      {
        "question": "What do you do to maximize productivity?"
      },
      {
        "question": "Do you put as much if not more effort into retaining employees as you do recruiting?"
      },
      {
        "question": "What is your retention strategy?"
      },
      {
        "question": "How do you promote a healthy work-life balance?"
      },
      {
        "question": "What metrics do you track and report on? Provide a report showing data from the last few months."
      },
      {
        "question": "How are teams assembled? How are team members selected? What are the selection criteria?"
      },
      {
        "question": "How often will the team I am in meet as a group?"
      },
      {
        "question": "What do you expect will be my role on the team?"
      },
      {
        "question": "What are the experience levels (i.e. junior, intermediate, senior) and job roles of the other team members?"
      },
      {
        "question": "What is involved in moving to another team or changing work assignments?"
      },
      {
        "question": "Do teams have a sufficient diversity of skill?"
      },
      {
        "question": "What types of team-building activities are done? How frequently?"
      },
      {
        "question": "Are teams empowered and self-organizing?"
      },
      {
        "question": "Are teams able to choose and tailor a methodology to suit them and their work?"
      },
      {
        "question": "How much freedom and support is provided to mentor and consult with colleagues, superiors, and customers?"
      },
      {
        "question": "Describe the clients, customers and end users I will be working with or for. How reasonable and pleasant are they?"
      },
      {
        "question": "What kind of work assignments will I be given?"
      },
      {
        "question": "What will be my day-to-day responsibilities?"
      },
      {
        "question": "What are the peaks and valleys in this job (throughout the year or day)?"
      },
      {
        "question": "What is a typical day like in this position?"
      },
      {
        "question": "What opportunities will there be to work with new, interesting technologies?"
      },
      {
        "question": "How do you plan to provide me with challenging work that makes optimal use of my abilities while providing a supportive environment?"
      },
      {
        "question": "Are developers required to do administrative or non-value-add tasks that could be done more cost effectively by others?"
      },
      {
        "question": "Will I be situated in an office with a door?"
      },
      {
        "question": "Is the work environment quiet with no distracting noises like intercoms, call center staff, ventilation systems, or traffic?"
      },
      {
        "question": "Are living, green plants in abundance in the office?"
      },
      {
        "question": "Are high quality chairs provided?"
      },
      {
        "question": "Is the office setting (chair, desk, keyboard, and monitor) ergonomically friendly?"
      },
      {
        "question": "Do you supply adequate workspace, varying based on the job?"
      },
      {
        "question": "Does the office setting support collaboration with coworkers? This includes at least one extra chair, the ability for two people to sit in front of the computer (i.e. pair programming), and a white board fixed onto a stable surface with room for at least three people to stand in front of it."
      },
      {
        "question": "Will I be provided with an ergonomic keyboard and mouse to my specifications? Or can I purchase my own and expense it with no questions asked?"
      },
      {
        "question": "Will I have the freedom to install the tools I want on my workstation?"
      },
      {
        "question": "What is the process and lead time to get a new tool, workstation, or server purchased and installed? How much bureaucracy and delay is involved?"
      },
      {
        "question": "Do projects have realistic schedules, resources, and scope that are actively managed and adjusted? How much freedom and control does the project manager / team have to change these three factors?"
      },
      {
        "question": "How do you deal with a project that is behind schedule?"
      },
      {
        "question": "How do you manage requests to change the scope or requirements of a project?"
      },
      {
        "question": "What tools and practices are used to manage project schedules?"
      },
      {
        "question": "Who estimates the time or effort required to do a project?"
      },
      {
        "question": "How is the expenditure of effort tracked? What tools are used for time entry and tracking progress?"
      },
      {
        "question": "What is the duration of iterations and releases?"
      },
      {
        "question": "What development methodologies do you use? Describe how they are put into practice."
      },
      {
        "question": "How closely does development activities align with the philosophy &amp; principles of Agile and Lean?"
      },
      {
        "question": "What continuous improvement activities are performed on a regular basis?"
      },
      {
        "question": "How often are retrospectives / lessons learned meetings held?"
      },
      {
        "question": "How aggressively do you minimize bureaucracy and non-value-add activities? Can you provide an example of improving in this regard in the last six months?"
      },
      {
        "question": "What is your process for handling suggestions and ideas from employees? How many suggestions per employee on average were received in the last year? How many were acted on?"
      },
      {
        "question": "Do you provide opportunities for employees to receive feedback?"
      },
      {
        "question": "What opportunities will I get to work with a mentor?"
      },
      {
        "question": "How much paid training do you provide to each employee per year? What kind of training is it?"
      },
      {
        "question": "Can employees choose or recommend the training they take?"
      },
      {
        "question": "What kinds of opportunities for growth and advancement are possible?"
      },
      {
        "question": "How do you make decisions regarding promotions?"
      },
      {
        "question": "What approach is used for providing timely, effective feedback on performance?"
      },
      {
        "question": "How are performance evaluations carried out?"
      },
      {
        "question": "What do you look for in an ideal employee?"
      },
      {
        "question": "What is the official number of hours worked per week?"
      },
      {
        "question": "How many hours per week on average have people in this (or a similar) position worked over the last three months?"
      },
      {
        "question": "Do you allow or expect mandatory overtime?"
      },
      {
        "question": "What do you consider an unacceptable amount of overtime (both mandatory and voluntary)?"
      },
      {
        "question": "Do you provide flexible working hours? What limits are there?"
      },
      {
        "question": "Do you provide a competitive salary? What is your definition of competitive?"
      },
      {
        "question": "How do you ensure that the salary of long-term employees stays competitive, especially in a hot job market?"
      },
      {
        "question": "Do you respect your long-term employees enough to raise their salaries in such situations without waiting for them to ask for raises?"
      },
      {
        "question": "How do you compensate for overtime?"
      },
      {
        "question": "Do you pay according to the level of productivity? Why or why not?"
      },
      {
        "question": "How many weeks per year of vacation do you offer?"
      },
      {
        "question": "How flexible are you concerning how banked vacation can be used? Can it be saved from year to year?"
      },
      {
        "question": "Are there any restrictions on taking vacation?"
      },
      {
        "question": "What is your policy concerning raises? How regularly do you give raises? Do you consider a yearly increase in salary equal to the local inflation rate to be a raise?"
      },
      {
        "question": "How do you reward exceptional performance? What do you consider exceptional performance and how do you identify it?"
      },
      {
        "question": "Do you provide share options, profit sharing, retirement savings contributions, or pension? If so, what are the details of the plan(s)?"
      },
      {
        "question": "What medical benefits do you provide?"
      },
      {
        "question": "Do you cover dental work or eyeglasses?"
      },
      {
        "question": "Do you cover health preventative measures such as exercise programs, vitamins, or preventative medical exams?"
      },
      {
        "question": "What is your policy regarding sick days?"
      },
      {
        "question": "Do you allow and support people in working from home? Up to what percentage of the time?"
      },
      {
        "question": "Will travel be expected? If so, how frequently, for how long, to where?"
      },
      {
        "question": "What is the policy on travel expenses?"
      },
      {
        "question": "What other benefits or perks do you provide?"
      },
      {
        "question": "How do you participate in and contribute to the local and global community?"
      },
      {
        "question": "Who are you competing with locally?"
      },
      {
        "question": "What do you see ahead for your company in the next five years?"
      },
      {
        "question": "How do you see the future for this industry?"
      },
      {
        "question": "What do you consider to be your firm's most important assets?"
      },
      {
        "question": "What can you tell me about your new product or plans for growth?"
      },
      {
        "question": "What happened to the last person who held this job?"
      },
      {
        "question": "What were the major strengths and weaknesses of the last person who held this job?"
      },
      {
        "question": "What types of skills do you NOT already have onboard that you're looking to fill with a new hire?"
      },
      {
        "question": "What are the career paths in this department?"
      },
      {
        "question": "What have been the department's successes in the last couple of years?"
      },
      {
        "question": "How do you view your group/division/department?"
      },
      {
        "question": "What would you consider to be the most important aspects of this job?"
      },
      {
        "question": "What are the skills and attributes you value most for someone being hired for this position?"
      },
      {
        "question": "Where have successful employees previously in this position progressed to within the company?"
      },
      {
        "question": "What are the most immediate challenges of the position that need to be addressed in the first three months?"
      },
      {
        "question": "What are the performance expectations of this position over the first 12 months?"
      },
      {
        "question": "What are the next steps in the interview process?"
      },
      {
        "question": "What major challenges are you currently facing as a manager?"
      },
      {
        "question": "What makes your company better than your competitors?"
      },
      {
        "question": "What are the areas where your competitors are better than your company?"
      },
      {
        "question": "Who do you consider your customers to be?"
      },
      {
        "question": "What can you tell me about the other people in the organization I would be working with? Can I meet with any of them before accepting an offer of employment?"
      },
      {
        "question": "What is your management style?"
      },
      {
        "question": "What is your preferred method of communicating with your team?"
      },
      {
        "question": "What is your company’s policy on attending seminars, workshops, and other training opportunities?"
      },
      {
        "question": "What attracted you to working for this organization?"
      },
      {
        "question": "What have you liked most about working here?"
      },
      {
        "question": "How would you describe your own management style?"
      },
      {
        "question": "What are the most important traits you look for in a subordinate?"
      },
      {
        "question": "How do you like your subordinates to communicate with you?"
      },
      {
        "question": "What personal qualities or characteristics do you most value?"
      },
      {
        "question": "How would you describe the experience of working here?"
      },
      {
        "question": "What are a couple of misconceptions people have about the company?"
      },
      {
        "question": "Before I leave, is there anything else you need to know concerning my ability to do this job?"
      },
      {
        "question": "Are there any recent or anticipated changes in the structure of the organization (mergers, cutbacks)?"
      },
      {
        "question": "If I want to further my education, does the organization offer tuition benefits?"
      },
      {
        "question": "Can I provide you with any other information to help you in the decision making process?"
      },
      {
        "question": "Will I have a written employment agreement?"
      },
      {
        "question": "Does your company require that I sign a non-compete agreement?"
      },
      {
        "question": "How many women and minorities hold management positions in your company?"
      },
      {
        "question": "Where do the other employees live? How far away are these communities? Can you describe them? What is the commute like?"
      },
      {
        "question": "What is the most challenging aspect to this job for someone who is new to the company?"
      },
      {
        "question": "What will the new (job title) have to accomplish in the next six months?"
      },
      {
        "question": "What are your expectations for newly hired employees?"
      },
      {
        "question": "What qualities do newly hired employees possess?"
      },
      {
        "question": "How would you describe a typical first assignment?"
      },
      {
        "question": "Why is the position open?"
      },
      {
        "question": "What are your major projects for the coming year?"
      },
      {
        "question": "What is the structure of the department where the position is located?"
      },
      {
        "question": "What is the work environment like?"
      },
      {
        "question": "What are the company's strengths and weaknesses?"
      },
      {
        "question": "What is the most challenging aspect of this job?"
      },
      {
        "question": "Who would I work with most closely?"
      },
      {
        "question": "How often can I expect to relocate?"
      },
      {
        "question": "How do you encourage your employees to keep current with professional developments in the field?"
      },
      {
        "question": "Can you describe your training program for me?"
      },
      {
        "question": "What is a typical career path for someone who has been in this position?",
        "answer": ""
      }
    ];
  });
