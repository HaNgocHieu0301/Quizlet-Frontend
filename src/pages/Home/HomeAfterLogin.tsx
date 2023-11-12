import { Card, Col, Row } from "antd";
import home6 from "~/assets/images/Home/home6.png";
import home4 from "~/assets/images/Home/home4.png";
import home5 from "~/assets/images/Home/home5.png";

function HomeAfterLogin() {
  return (
    <div>
      <div className="px-40 py-8">
        <h3 className="text-start mb-4">Popular flashcard sets</h3>
        <Row gutter={24}>
          <Col span={8}>
            <Card
              style={{ height: 120, zIndex: -10 }}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">More powerful search</h4>
              <p className="text-start">
                Find flashcards on any subject you need to learn
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ height: 120, zIndex: -10 }}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">
                Improve your results with Learn
              </h4>
              <p className="text-start">
                Learn with improved questions, more control and hints
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ height: 120, zIndex: -10 }}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">Be ready for your exams</h4>
              <p className="text-start">
                Test mode with AI-enhanced hints and study guidance
              </p>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="px-40 pt-8">
        <h3 className="text-start mb-4">Popular Blogs</h3>
        <Row gutter={24}>
          <Col span={8}>
            <Card
              style={{ height: 120, zIndex: -10 }}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">More powerful search</h4>
              <p className="text-start">
                Find flashcards on any subject you need to learn
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ height: 120, zIndex: -10 }}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">
                Improve your results with Learn
              </h4>
              <p className="text-start">
                Learn with improved questions, more control and hints
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ height: 120, zIndex: -10 }}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">Be ready for your exams</h4>
              <p className="text-start">
                Test mode with AI-enhanced hints and study guidance
              </p>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="px-40 pt-8">
        <h3 className="text-start mb-4">Try these updated features</h3>
        <Row gutter={24}>
          <Col span={8}>
            <Card
              style={{ height: 280, zIndex: -10 }}
              cover={<img alt="" src={home4}></img>}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">More powerful search</h4>
              <p className="text-start">
                Find flashcards on any subject you need to learn
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ height: 280, zIndex: -10 }}
              cover={<img alt="" src={home5}></img>}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">
                Improve your results with Learn
              </h4>
              <p className="text-start">
                Learn with improved questions, more control and hints
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ height: 280, zIndex: -10 }}
              cover={<img alt="" src={home6}></img>}
              hoverable
              bordered={false}
            >
              <h4 className="text-start mb-3">Be ready for your exams</h4>
              <p className="text-start">
                Test mode with AI-enhanced hints and study guidance
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomeAfterLogin;
