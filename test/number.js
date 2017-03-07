import chai from 'chai';
import valjs, {
  number,
} from '../dist/val';

const should = chai.should();

describe('number', function() {
  it('check if number', (done) => {
    const error = valjs(1, number);

    should.equal(error, null);
    done();
  });
  it('error that got string', (done) => {
    const error = valjs('hey', number);

    should.equal(error, 'Invalid: expected number. got string');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, number);

    should.equal(error, 'Invalid: expected number. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], number);

    should.equal(error, 'Invalid: expected number. got array');
    done();
  });
  it('error that got func', (done) => {
    const error = valjs(() => {}, number);

    should.equal(error, 'Invalid: expected number. got func');
    done();
  });
  it('error that got bool', (done) => {
    const error = valjs(true, number);

    should.equal(error, 'Invalid: expected number. got bool');
    done();
  });
  it('error that got date', (done) => {
    const error = valjs(new Date(), number);

    should.equal(error, 'Invalid: expected number. got date');
    done();
  });
});

describe('number require', function() {
  it('check require', (done) => {
    const error = valjs(2, number.require());

    should.equal(error, null);
    done();
  });
  it('error require', (done) => {
    const error = valjs(null, number.require());

    should.equal(error, 'Invalid: required');
    done();
  });
});

describe('number custom', function() {
  it('check custom', (done) => {
    const error = number.custom((value) => {
      if (value === 1) {
        return null;
      }
    }).test(1);

    should.equal(error, null);
    done();
  });
  it('error custom', (done) => {
    const error = number.custom((value) => {
      if (value === 1) {
        return null;
      } else {
        return 'Some error';
      }
    }).test(2);

    should.equal(error, 'Invalid: Some error');
    done();
  });
});

describe('number comparisons', function() {
  it('check eq', (done) => {
    const error = valjs(2, number.eq(2));

    should.equal(error, null);
    done();
  });
  it('check neq', (done) => {
    const error = valjs(1, number.neq(2));

    should.equal(error, null);
    done();
  });
  it('check gt', (done) => {
    const error = valjs(3, number.gt(2));

    should.equal(error, null);
    done();
  });
  it('check gte', (done) => {
    const error = valjs(3, number.gte(3));

    should.equal(error, null);
    done();
  });
  it('check lt', (done) => {
    const error = valjs(2, number.lt(3));

    should.equal(error, null);
    done();
  });
  it('check lte', (done) => {
    const error = valjs(2, number.lte(2));

    should.equal(error, null);
    done();
  });
  it('error eq', (done) => {
    const error = valjs(1, number.eq(2));

    should.equal(error, 'Invalid: expected not equal \'2\'');
    done();
  });
  it('error neq', (done) => {
    const error = valjs(2, number.neq(2));

    should.equal(error, 'Invalid: expected equal \'2\'');
    done();
  });
  it('error gt', (done) => {
    const error = valjs(1, number.gt(2));

    should.equal(error, 'Invalid: expected greater than \'2\'');
    done();
  });
  it('error gte', (done) => {
    const error = valjs(1, number.gte(2));

    should.equal(error, 'Invalid: expected greater than equal \'2\'');
    done();
  });
  it('error lt', (done) => {
    const error = valjs(2, number.lt(1));

    should.equal(error, 'Invalid: expected less than \'1\'');
    done();
  });
  it('error lte', (done) => {
    const error = valjs(2, number.lte(1));

    should.equal(error, 'Invalid: expected less than equal \'1\'');
    done();
  });
});

describe('number format', function() {
  it('check format', (done) => {
    const error = valjs(2, number.format(/^[0-8]*$/));

    should.equal(error, null);
    done();
  });
  it('error format', (done) => {
    const error = valjs(9, number.format(/^[0-8]*$/));

    should.equal(error, 'Invalid: did not match format');
    done();
  });
});

describe('number int', function() {
  it('check if int', (done) => {
    const error = valjs(2, number.int());

    should.equal(error, null);
    done();
  });
  it('error int', (done) => {
    const error = valjs(9.5, number.int());

    should.equal(error, 'Invalid: 9.5 is not an integer');
    done();
  });
  it('error int', (done) => {
    const error = valjs('9', number.int());

    should.equal(error, 'Invalid: expected number. got string');
    done();
  });
});
