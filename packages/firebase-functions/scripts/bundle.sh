set -eux

pnpm build
rm -rf bundle
pnpm bundle

rm -rf ../../firebase/functions
mkdir ../../firebase/functions
cp -r bundle/* ../../firebase/functions/
