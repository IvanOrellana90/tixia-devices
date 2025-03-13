import React, { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UiTypography = () => {
  return (
    <Fragment>
      <PageTitle activeMenu="Typography" motherMenu="Bootstrap" />
      <Row>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title">Heading With Tages</h4>
              <p className="m-0 subtitle">
                Use tags <code>h1 to h6</code> for get desire heading.
              </p>
            </div>
            <Card.Body>
              <h1>h1. Bootstrap heading</h1>
              <h2>h2. Bootstrap heading</h2>
              <h3>h3. Bootstrap heading</h3>
              <h4>h4. Bootstrap heading</h4>
              <h5>h5. Bootstrap heading</h5>
              <h6>h6. Bootstrap heading</h6>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title">Heading With Classes</h4>
              <p className="m-0 subtitle">
                Use classes <code>.h1 to .h6</code> for get desire heading.
              </p>
            </div>
            <Card.Body>
              <h1 className="h1">h1. Bootstrap heading</h1>
              <h2 className="h2">h2. Bootstrap heading</h2>
              <h3 className="h3">h3. Bootstrap heading</h3>
              <h4 className="h4">h4. Bootstrap heading</h4>
              <h5 className="h5">h5. Bootstrap heading</h5>
              <h6 className="h6">h6. Bootstrap heading</h6>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title">Display Heading</h4>
              <p className="m-0 subtitle">
                Use classes <code>display-1 to display-6</code> for get desire
                heading.
              </p>
            </div>
            <Card.Body>
              <h1 className="display-1">Display 1</h1>
              <h1 className="display-2">Display 2</h1>
              <h1 className="display-3">Display 3</h1>
              <h1 className="display-4">Display 4</h1>
              <h1 className="display-5">Display 5</h1>
              <h1 className="display-6">Display 6</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title">Inline Text Elements</h4>
              <p className="m-0 subtitle">
                Use Tags <code>del, s, inc etc.</code> for get desire heading.
              </p>
            </div>
            <Card.Body>
              <p>
                You can use the mark tag to <mark>highlight</mark> text.
              </p>
              <p>
                <del>
                  This line of text is meant to be treated as deleted text.
                </del>
              </p>
              <p>
                <s>
                  This line of text is meant to be treated as no longer
                  accurate.
                </s>
              </p>
              <p>
                <ins>
                  This line of text is meant to be treated as an addition to the
                  document.
                </ins>
              </p>
              <p>
                <u>This line of text will render as underlined.</u>
              </p>
              <p>
                <small>
                  This line of text is meant to be treated as fine print.
                </small>
              </p>
              <p>
                <strong>This line rendered as bold text.</strong>
              </p>
              <p>
                <em>This line rendered as italicized text.</em>
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title">Customizing Headings</h4>
            </div>
            <Card.Body>
              <h3>
                Fancy display heading
                <small className="text-body-secondary">
                  With faded secondary text
                </small>
              </h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title">Lead </h4>
            </div>
            <Card.Body>
              <p className="lead">
                This is a lead paragraph. It stands out from regular paragraphs.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title">Alignment text</h4>
              <p className="m-0 subtitle">
                Use classes <code>text-start, text-center, text-end</code> for
                get desire heading.
              </p>
            </div>
            <Card.Body>
              <p className="text-start">
                Left aligned text on all viewport sizes.
              </p>
              <p className="text-center">
                Center aligned text on all viewport sizes.
              </p>
              <p className="text-end">
                Right aligned text on all viewport sizes.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">
                Font weight and italics
              </h4>
              <p className="m-0 subtitle">
                Use tags <code>, fw-normal, fw-italic</code> for get desire
                text.
              </p>
            </div>
            <Card.Body>
              <p className="text-sm-start">
                Left aligned text on viewports sized SM (small) or wider.
              </p>
              <p className="text-md-start">
                Left aligned text on viewports sized MD (medium) or wider.
              </p>
              <p className="text-lg-start">
                Left aligned text on viewports sized LG (large) or wider.
              </p>
              <p className="text-xl-start">
                Left aligned text on viewports sized XL (extra-large) or wider.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Text Colors</h4>
              <p className="m-0 subtitle">
                Use tags <code>, fw-normal, fw-italic</code> for get desire
                text.
              </p>
            </div>
            <Card.Body>
              <p className="text-muted">
                This is an example of muted text. Add class{' '}
                <code>.text-muted</code>
              </p>
              <p className="text-primary">
                This is an example of primary text. Add class{' '}
                <code>.text-primary</code>
              </p>
              <p className="text-success">
                This is an example of success text. Add class{' '}
                <code>.text-success</code>
              </p>
              <p className="text-info">
                This is an example of info text. Add class{' '}
                <code>.text-info</code>
              </p>
              <p className="text-warning">
                This is an example of warning text. Add class{' '}
                <code>.text-warning</code>
              </p>
              <p className="text-danger">
                This is an example of danger text. Add class{' '}
                <code>.text-danger</code>
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Font Sizes</h4>
              <p className="m-0 subtitle">
                Use Classes <code>.fs-1 to .fs-6</code> for get desire text.
              </p>
            </div>
            <Card.Body>
              <p className="fs-1 mb-2">.fs-1 text</p>
              <p className="fs-2 mb-2">.fs-2 text</p>
              <p className="fs-3 mb-2">.fs-3 text</p>
              <p className="fs-4 mb-2">.fs-4 text</p>
              <p className="fs-5 mb-2">.fs-5 text</p>
              <p className="fs-6 mb-0">.fs-6 text</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Blockquotes</h4>
            </div>
            <Card.Body>
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>

              <h5 className="subtitle">
                Blockquote With <code>figcaption</code>{' '}
              </h5>
              <figure>
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Someone famous in{' '}
                  <cite title="Source Title">Source Title</cite>
                </figcaption>
              </figure>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">
                Blockquotes Alighment
              </h4>
            </div>
            <Card.Body>
              <h5 className="subtitle">Blockquote With Center Alighment</h5>
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Someone famous in{' '}
                  <cite title="Source Title">Source Title</cite>
                </figcaption>
              </figure>

              <h5 className="subtitle">Blockquote With Right Alighment</h5>
              <figure className="text-end">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Someone famous in{' '}
                  <cite title="Source Title">Source Title</cite>
                </figcaption>
              </figure>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Unstyled Lists</h4>
            </div>
            <Card.Body>
              <ul className="list-unstyled">
                <li>This is a list.</li>
                <li>It appears completely unstyled.</li>
                <li>Structurally, it's still a list.</li>
                <li>
                  However, this style only applies to immediate child elements.
                </li>
                <li>
                  Nested lists:
                  <ul>
                    <li>are unaffected by this style</li>
                    <li>will still show a bullet</li>
                    <li>and have appropriate left margin</li>
                  </ul>
                </li>
                <li>This may still come in handy in some situations.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Description List</h4>
            </div>
            <Card.Body>
              <dl className="row">
                <dt className="col-sm-3">Description lists</dt>
                <dd className="col-sm-9">
                  A description list is perfect for defining terms.
                </dd>

                <dt className="col-sm-3">Term</dt>
                <dd className="col-sm-9">
                  <p>Definition for the term.</p>
                  <p>And some more placeholder definition text.</p>
                </dd>

                <dt className="col-sm-3">Another term</dt>
                <dd className="col-sm-9">
                  This definition is short, so no extra paragraphs or anything.
                </dd>

                <dt className="col-sm-3 text-truncate">
                  Truncated term is truncated
                </dt>
                <dd className="col-sm-9">
                  This can be useful when space is tight. Adds an ellipsis at
                  the end.
                </dd>

                <dt className="col-sm-3">Nesting</dt>
                <dd className="col-sm-9">
                  <dl className="row">
                    <dt className="col-sm-4">Nested definition list</dt>
                    <dd className="col-sm-8">
                      I heard you like definition lists. Let me put a definition
                      list inside your definition list.
                    </dd>
                  </dl>
                </dd>
              </dl>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Inline List</h4>
            </div>
            <Card.Body>
              <p className="fw-bold">Bold text.</p>
              <p className="fw-normal">Normal weight text.</p>
              <p className="fst-italic">Italic text.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Abbreviations </h4>
            </div>
            <Card.Body>
              <p>
                <abbr title="attribute">attr</abbr>
              </p>
              <p>
                <abbr title="HyperText Markup Language" className="initialism">
                  HTML
                </abbr>
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Ol Listing </h4>
            </div>
            <Card.Body>
              <ol className="list-style">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Ul Listing </h4>
            </div>
            <Card.Body>
              <ul className="list-style">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Inline List</h4>
            </div>
            <Card.Body>
              <ul className="list-inline">
                <li className="list-inline-item">This is a list item.</li>
                <li className="list-inline-item">And another one.</li>
                <li className="list-inline-item">
                  But they're displayed inline.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title">Monospace</h4>
            </div>
            <Card.Body>
              <p className="font-monospace mb-0">This is in monospace</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title mb-1">
                Fancy Listing 1
              </h4>
              <p className="m-0 subtitle">
                Use class <code>list-icons</code> to ul for get desire ol list.
              </p>
            </div>
            <Card.Body>
              <ul className="list-icons">
                <li>
                  <span className="align-middle me-2">
                    <i className="ti-angle-right"></i>
                  </span>{' '}
                  Lorem ipsum dolor sit amet
                </li>
                <li>
                  <span className="align-middle me-2">
                    <i className="ti-angle-right"></i>
                  </span>{' '}
                  Consectetur adipiscing elit
                </li>
                <li>
                  <span className="align-middle me-2">
                    <i className="ti-angle-right"></i>
                  </span>{' '}
                  Integer molestie lorem at massa
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="col-12">
          <Card>
            <div className="card-header d-block">
              <h4 className="card-title card-intro-title mb-1">
                Fancy Listing with href
              </h4>
              <p className="m-0 subtitle">
                Use class <code>list-icons</code> to ul for get desire ol list.
              </p>
            </div>
            <Card.Body>
              <ul className="list-icons">
                <li>
                  <Link to={'#'}>
                    <span className="align-middle me-2">
                      <i className="fa fa-check text-info"></i>
                    </span>{' '}
                    Lorem ipsum dolor sit amet
                  </Link>
                </li>
                <li>
                  <Link to={'#'}>
                    <span className="align-middle me-2">
                      <i className="fa fa-check text-info"></i>
                    </span>
                    Consectetur adipiscing elit
                  </Link>
                </li>
                <li>
                  <Link to={'#'}>
                    <span className="align-middle me-2">
                      <i className="fa fa-check text-info"></i>
                    </span>
                    Integer molestie lorem at massa
                  </Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UiTypography;
