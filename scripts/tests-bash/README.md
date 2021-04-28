Testing shell scripts
-----

You can test shell scripts by running:

    ./scripts/tests-bash/test.sh

Adding a test for a bash script
-----

Take a look at some examples. For example:

    ./scripts/tests-bash/scripts/lib/add-to-env.test.sh

is a test for

    ./scripts/lib/add-to-env.test.sh

Adding files ending in .test.sh directly to ./scripts/tests-bash/scripts will add them to the test suite.
