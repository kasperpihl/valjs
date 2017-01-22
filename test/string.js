import chai from 'chai';
import valjs, {
  string,
} from '../dist/val';

const should = chai.should();

describe('string', function() {
  it('check if string', (done) => {
    const error = valjs('hello', string);

    should.equal(error, null);
    done();
  });
  it('error that got number', (done) => {
    const error = valjs(2, string);

    should.equal(error, 'Invalid: expected string. got number');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, string);

    should.equal(error, 'Invalid: expected string. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], string);

    should.equal(error, 'Invalid: expected string. got array');
    done();
  });
  it('error that got func', (done) => {
    const error = valjs(() => {}, string);

    should.equal(error, 'Invalid: expected string. got func');
    done();
  });
  it('error that got bool', (done) => {
    const error = valjs(true, string);

    should.equal(error, 'Invalid: expected string. got bool');
    done();
  });
  it('error that got date', (done) => {
    const error = valjs(new Date(), string);

    should.equal(error, 'Invalid: expected string. got date');
    done();
  });
});

describe('string require', function() {
  it('check require', (done) => {
    const error = valjs('hello', string.require());

    should.equal(error, null);
    done();
  });
  it('error require', (done) => {
    const error = valjs(null, string.require());

    should.equal(error, 'Invalid: required');
    done();
  });
});

// describe('string custom', function() {
//   it('check custom', (done) => {
//     const error = string.custom((value) => {
//       if (value === 'hi') {
//         return null;
//       }
//     }).test('hi');
//
//     should.equal(error, null);
//     done();
//   });
//   it('error custom', (done) => {
//     const error = string.custom((value) => {
//       if (value === 'hi') {
//         return null;
//       } else {
//         return '';
//       }
//     }).test('hii');
//
//     should.equal(error, 'Some error');
//     done();
//   });
// });

describe('string bounds', function() {
  it('check min length', (done) => {
    const error = valjs('hi', string.min(2));

    should.equal(error, null);
    done();
  });
  it('check max length', (done) => {
    const error = valjs('hi', string.max(2));

    should.equal(error, null);
    done();
  });
  it('check min-max range length', (done) => {
    const error = valjs('hello', string.min(2).max(10));

    should.equal(error, null);
    done();
  });
  it('check empty', (done) => {
    const error = valjs('', string.empty());

    should.equal(error, null);
    done();
  });
  it('error min length', (done) => {
    const error = valjs('hi', string.min(3));

    should.equal(error, 'Invalid: min size 3. got 2');
    done();
  });
  it('error max length', (done) => {
    const error = valjs('hello', string.max(3));

    should.equal(error, 'Invalid: max size 3. got 5');
    done();
  });
  it('error min-max range length', (done) => {
    const error = valjs('h', string.min(2).max(10));

    should.equal(error, 'Invalid: min size 2. got 1');
    done();
  });
  it('error empty', (done) => {
    const error = valjs('hello', string.empty());

    should.equal(error, 'Invalid: not empty');
    done();
  });
});

describe('string comparisons', function() {
  it('check eq', (done) => {
    const error = valjs('hi', string.eq('hi'));

    should.equal(error, null);
    done();
  });
  it('check neq', (done) => {
    const error = valjs('hi', string.neq('hii'));

    should.equal(error, null);
    done();
  });
  it('check gt', (done) => {
    const error = valjs('b', string.gt('a'));

    should.equal(error, null);
    done();
  });
  it('check gte', (done) => {
    const error = valjs('a', string.gte('a'));

    should.equal(error, null);
    done();
  });
  it('check lt', (done) => {
    const error = valjs('a', string.lt('b'));

    should.equal(error, null);
    done();
  });
  it('check lte', (done) => {
    const error = valjs('a', string.lte('a'));

    should.equal(error, null);
    done();
  });
  it('error eq', (done) => {
    const error = valjs('hi', string.eq('hii'));

    should.equal(error, 'Invalid: expected not equal \'hii\'');
    done();
  });
  it('error neq', (done) => {
    const error = valjs('hi', string.neq('hi'));

    should.equal(error, 'Invalid: expected equal \'hi\'');
    done();
  });
  it('error gt', (done) => {
    const error = valjs('a', string.gt('b'));

    should.equal(error, 'Invalid: expected greater than \'b\'');
    done();
  });
  it('error gte', (done) => {
    const error = valjs('a', string.gte('b'));

    should.equal(error, 'Invalid: expected greater than equal \'b\'');
    done();
  });
  it('error lt', (done) => {
    const error = valjs('b', string.lt('a'));

    should.equal(error, 'Invalid: expected less than \'a\'');
    done();
  });
  it('error lte', (done) => {
    const error = valjs('b', string.lte('a'));

    should.equal(error, 'Invalid: expected less than equal \'a\'');
    done();
  });
});

describe('string format', function() {
  it('check format', (done) => {
    const error = valjs('hi', string.format(/hi/));

    should.equal(error, null);
    done();
  });
  it('error format', (done) => {
    const error = valjs('hi', string.format(/ha/));

    should.equal(error, 'Invalid: did not match format');
    done();
  });
});
