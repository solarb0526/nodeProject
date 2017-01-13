/**
 * Created by jihyun on 2017. 1. 13..
 */
suite('"About" page Tests', function(){
    test('page should contain link to contract page', function(){
        assert($('a[href="/contract"]').length);
    });
});