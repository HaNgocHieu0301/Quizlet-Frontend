import { Button, Card, Col, Row } from "antd";
import home2 from "~/assets/images/Home/Home2.png";
import home1 from "~/assets/images/Home/home1.png";
import student1 from "~/assets/images/Home/student1.png";
import student2 from "~/assets/images/Home/student2.png";
import student3 from "~/assets/images/Home/student3.png";

const HomeBeforeLogin = () => {
  return (
    <div>
      <div
        className="w-full h-[650px] bg-center bg-cover"
        style={{ backgroundImage: `url(${home1})` }}
      >
        <div className="w-2/3 text-start p-40">
          <h1 className="text-white mb-6">
            Digital flashcards and the best study tools
          </h1>
          <p className="text-white mb-6">
            Join more than 60 million students using Quizlet's science-based
            flashcards, practice tests, and expert answers to improve their
            scores and reach their goals.
          </p>
          <Button size="large" type="primary">
            Register now
          </Button>
        </div>
      </div>
      <div className="py-20 px-56">
        <h1 className="mb-16">What students say about Quizlet</h1>
        <Row gutter={24}>
          <Col span={8}>
            <Card
              style={{ height: 420 }}
              cover={<img alt="" src={student1}></img>}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">
                “Quizlet has fueled my success since high school. Flashcards
                that can be used on the go are helping me greatly in college.”
              </h4>
              <p className="text-start">Hamza, final year, Medicine</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ height: 420 }}
              cover={<img alt="" src={student2}></img>}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">
                “Study Mode is the best thing ever from Quizlet. It shows you
                the terms in a way that's easy to remember."
              </h4>
              <p className="text-start">Sydney, second year, Biology</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ height: 420 }}
              cover={<img alt="" src={student3}></img>}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">
                “All of our friends use Quizlet. This is an interesting way to
                learn and we feel more confident preparing for the midterm and
                final exams."
              </h4>
              <p className="text-start">
                Owen & Oscar, sophomores in high school
              </p>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="flex flex-row items-center justify-center bg-[#dbdfff] p-20">
        <div className="w-1/2 pr-20 text-start">
          <h3>Teacher</h3>
          <h1 className="mb-6">Energize your students</h1>
          <p className="mb-6">
            Helps students confidently learn any content, no matter what their
            goal is. Using Quizlet's free sets, study modes, and classroom
            Milestones games, you can instantly create a more interactive
            classroom. Students and teachers can register and learn for free.
          </p>
          <Button size="large" type="primary">
            Register now
          </Button>
        </div>
        <div
          className="w-[400px] h-[400px] bg-center bg-cover"
          style={{ backgroundImage: `url(${home2})` }}
        ></div>
      </div>
    </div>
  );
};

export default HomeBeforeLogin;
